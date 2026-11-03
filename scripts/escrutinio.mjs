// Escrutinio del 29-N: lee los resultados, los normaliza y escribe escrutinio.json para /resultados-29n.
//
// Prueba con los datos de 2023 (como si estuviera escrutado el 37 %):
//   node scripts/escrutinio.mjs --prueba 37 --salida dist/escrutinio-prueba.json
//   → abre /resultados-29n?prueba en `npm run preview`.
//
// La noche del 29-N (fuente oficial de Interior; el adaptador se conecta cuando se publique su formato):
//   node scripts/escrutinio.mjs --fuente <url> --salida ../escrutinio-29n/escrutinio.json --bucle 60 --publicar
//   --bucle N: repite cada N segundos. --publicar: commit y push del repo donde está --salida
//   (GitHub Pages purga su caché en cada despliegue, raw.githubusercontent no).
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { leerInterior } from './escrutinio/interior.mjs';

const { values: args } = parseArgs({
  options: {
    prueba: { type: 'string' },
    fuente: { type: 'string' },
    salida: { type: 'string', default: 'dist/escrutinio-prueba.json' },
    bucle: { type: 'string' },
    publicar: { type: 'boolean', default: false },
  },
});

const PROVINCIAS = JSON.parse(readFileSync(new URL('../src/data/provincias.json', import.meta.url), 'utf8'));

// Siglas de 2023 → partido de la web (mismo criterio que SIGLAS_2023 en src/lib/partidos.ts; Frente Amplio = Sumar).
const FAMILIAS_2023 = {
  pp: ['PP'],
  psoe: ['PSOE', 'PSC–PSOE', 'PSdeG–PSOE', 'PSE–EE (PSOE)', 'PSIB–PSOE', 'PSN–PSOE'],
  vox: ['Vox'],
  'frente-amplio': ['Sumar', 'Sumar–Compromís', 'Sumar–ECP', 'Sumar Aragón', 'Més–MxMe–Sumar'],
  erc: ['ERC'],
  junts: ['Junts'],
  'eh-bildu': ['EH Bildu'],
  pnv: ['EAJ/PNV'],
  bng: ['BNG'],
  'coalicion-canaria': ['CCa'],
  'upn-pp': ['UPN'],
  'frente-obrero': ['FO'],
  pacma: ['PACMA'],
  pcte: ['PCTE', 'PCTC', 'PCTE/ELAK', 'PCTG'],
};
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const familia2023 = new Map(Object.entries(FAMILIAS_2023).flatMap(([f, ss]) => ss.map((s) => [norm(s), f])));

/** Partido de la web para unas siglas: primero las listas del BOE de esa provincia (2026), luego las de 2023. */
function familiaDe(siglas, provincia) {
  const n = norm(siglas);
  const lista = provincia.listas.find((l) => norm(l.siglas) === n);
  return lista?.familia ?? familia2023.get(n) ?? null;
}

/** Reparto D'Hondt (LOREG art. 163), igual que dhondt() en src/lib/datos.ts. */
function dhondt(votos, escanos, validos) {
  const aptas = votos.filter((v) => v.votos > 0 && v.votos >= validos * 0.03);
  const cocientes = aptas.flatMap((v) => Array.from({ length: escanos }, (_, i) => ({ id: v.id, q: v.votos / (i + 1), v: v.votos })));
  cocientes.sort((a, b) => b.q - a.q || b.v - a.v);
  const res = Object.fromEntries(votos.map((v) => [v.id, 0]));
  for (const c of cocientes.slice(0, escanos)) res[c.id]++;
  return res;
}

const r1 = (n) => Math.round(n * 100) / 100;

/**
 * Datos crudos → escrutinio.json. Cada provincia: { escrutado (% mesas), censo, censoEscrutado? (de las mesas ya escrutadas), votantes, blancos, nulos,
 * partidos: [{ siglas, votos, escanos? }] }. Si la fuente no trae escaños, se calculan con D'Hondt.
 */
function normalizar(crudo, { prueba, fuente }) {
  const provincias = {};
  const total = new Map();
  let censo = 0, censoEscrutado = 0, votantes = 0, validos = 0, blancos = 0, nulos = 0, escrutadoPond = 0;
  for (const p of PROVINCIAS) {
    const d = crudo[p.slug];
    if (!d) continue;
    const val = d.partidos.reduce((s, x) => s + x.votos, 0) + d.blancos;
    const filas = d.partidos.map((x) => ({ id: familiaDe(x.siglas, p) ?? `otros:${x.siglas}`, siglas: x.siglas, votos: x.votos, escanos: x.escanos }));
    const reparto = filas.every((x) => typeof x.escanos === 'number') ? null : dhondt(filas, p.escanos, val);
    const partidos = filas
      .map((x) => ({ ...x, escanos: reparto ? reparto[x.id] : x.escanos, pct: val ? r1((100 * x.votos) / val) : 0 }))
      .filter((x) => x.votos > 0)
      .sort((a, b) => b.escanos - a.escanos || b.votos - a.votos);
    provincias[p.slug] = {
      escrutado: r1(d.escrutado),
      participacion: (d.censoEscrutado ?? d.censo) ? r1((100 * d.votantes) / (d.censoEscrutado ?? d.censo)) : null,
      blancos: d.blancos,
      nulos: d.nulos,
      partidos,
    };
    for (const x of partidos) {
      const t = total.get(x.id) ?? { id: x.id, siglas: x.siglas, votos: 0, escanos: 0 };
      t.votos += x.votos;
      t.escanos += x.escanos;
      total.set(x.id, t);
    }
    censo += d.censo;
    censoEscrutado += d.censoEscrutado ?? d.censo;
    votantes += d.votantes;
    validos += val;
    blancos += d.blancos;
    nulos += d.nulos;
    escrutadoPond += d.escrutado * d.censo;
  }
  const partidos = [...total.values()]
    .map((x) => ({ ...x, pct: validos ? r1((100 * x.votos) / validos) : 0 }))
    .sort((a, b) => b.escanos - a.escanos || b.votos - a.votos);
  return {
    version: 1,
    prueba,
    actualizado: new Date().toISOString(),
    fuente,
    escrutado: censo ? r1(escrutadoPond / censo) : 0,
    participacion: censoEscrutado ? r1((100 * votantes) / censoEscrutado) : null,
    total: { votantes, validos, blancos, nulos, partidos },
    provincias,
  };
}

/** Datos de prueba: el resultado de 2023 recortado al % escrutado (cada provincia avanza a un ritmo distinto). */
function crudoDePrueba(pct) {
  const crudo = {};
  PROVINCIAS.forEach((p, i) => {
    const e = pct >= 100 ? 100 : Math.max(0, Math.min(100, pct + ((i * 37) % 21) - 10));
    const k = e / 100;
    crudo[p.slug] = {
      escrutado: e,
      censo: p.r2023.censo,
      censoEscrutado: Math.round(p.r2023.censo * k),
      votantes: Math.round(p.r2023.votantes * k),
      blancos: Math.round(p.r2023.blancos * k),
      nulos: Math.round(p.r2023.nulos * k),
      partidos: p.r2023.partidos.map((x) => ({ siglas: x.siglas, votos: Math.round(x.votos * k) })),
    };
  });
  return crudo;
}

async function unaVez() {
  let datos;
  if (args.prueba !== undefined) {
    datos = normalizar(crudoDePrueba(Number(args.prueba)), {
      prueba: true,
      fuente: { nombre: 'Prueba con los resultados de 2023 (Ministerio del Interior)', url: 'https://infoelectoral.interior.gob.es' },
    });
  } else if (args.fuente) {
    datos = normalizar(await leerInterior(args.fuente, PROVINCIAS), {
      prueba: false,
      fuente: { nombre: 'Ministerio del Interior, resultados provisionales', url: args.fuente },
    });
  } else {
    throw new Error('Indica --prueba <pct> o --fuente <url>.');
  }
  const salida = resolve(args.salida);
  mkdirSync(dirname(salida), { recursive: true });
  writeFileSync(salida, JSON.stringify(datos));
  console.log(`${new Date().toLocaleTimeString('es-ES')} · ${datos.escrutado} % escrutado · ${datos.total.partidos.slice(0, 4).map((x) => `${x.siglas} ${x.escanos}`).join(', ')} → ${salida}`);
  if (args.publicar) {
    const repo = dirname(salida);
    execFileSync('git', ['-C', repo, 'add', '-A']);
    try {
      execFileSync('git', ['-C', repo, 'commit', '-q', '-m', `Escrutinio ${datos.escrutado} %`]);
      execFileSync('git', ['-C', repo, 'push', '-q']);
    } catch (e) {
      console.warn('Sin cambios o fallo al publicar:', e.message.split('\n')[0]);
    }
  }
}

if (args.bucle) {
  const cada = Math.max(30, Number(args.bucle)) * 1000;
  for (;;) {
    try {
      await unaVez();
    } catch (e) {
      console.error(e.message);
    }
    await new Promise((r) => setTimeout(r, cada));
  }
} else {
  await unaVez();
}
