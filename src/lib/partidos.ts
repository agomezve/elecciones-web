// Ruta: src/lib/partidos.ts
// Fichas de partido. Regla de neutralidad: todas usan la misma plantilla, se ordenan por escaños
// obtenidos en 2023 (y, si no tuvieron, por número de provincias en las que se presentan ahora)
// y no llevan opiniones. Las cabezas de lista salen del BOE; las medidas, de src/lib/propuestas.ts
// (cada una con su fuente) hasta que el partido publique su programa.
import { PROVINCIAS, type Lista, type Provincia } from './datos';

export interface Partido {
  slug: string;
  siglas: string;
  nombre: string;
  /** Color de la marca, solo para gráficos. */
  color: string;
  logo?: string;
  /** Ámbito en el que se presenta. */
  ambito: 'estatal' | 'autonómico';
  /** Provincia de referencia para la cabeza de lista principal (la de la capital o la del partido). */
  provinciaRef: string;
  /** Resultado de 2023 de las mismas siglas (escaños y votos en toda España); null si no se presentó. */
  r2023: { escanos: number; votos: number; nota?: string } | null;
  /** Si se presentó en 2023 dentro de otra candidatura. */
  nota2023?: string;
  web?: string;
  programa?: { url: string; fecha: string } | null;
  /** Programa presentado, pero sin documento completo localizado en la web del partido: se enlaza la noticia. */
  programaPresentado?: { fecha: string; medio: string; url: string };
  /** Otras cabezas de lista que se destacan en la ficha (provincia → slug). */
  destacados?: string[];
}

export const VALIDOS_2023 = 24_728_087;

export const PARTIDOS: Partido[] = [
  {
    slug: 'pp', siglas: 'PP', nombre: 'Partido Popular', color: '#1d84ce', logo: '/img/partidos/pp.svg',
    ambito: 'estatal', provinciaRef: 'madrid', r2023: { escanos: 137, votos: 8_160_837 }, web: 'https://www.pp.es',
    destacados: ['barcelona'],
    programa: { url: 'https://www.pp.es/wp-content/uploads/2026/11/LA-RECONSTRUCCION-NACIONAL.pdf', fecha: '2026-11-10' },
  },
  {
    slug: 'psoe', siglas: 'PSOE', nombre: 'Partido Socialista Obrero Español', color: '#e30613', logo: '/img/partidos/psoe.svg',
    ambito: 'estatal', provinciaRef: 'madrid',
    r2023: { escanos: 121, votos: 7_821_718, nota: 'Incluye PSC, PSdeG, PSE-EE, PSIB y PSN.' }, web: 'https://www.psoe.es',
    destacados: ['barcelona'],
  },
  {
    slug: 'vox', siglas: 'VOX', nombre: 'VOX', color: '#5ac035', logo: '/img/partidos/vox.svg',
    ambito: 'estatal', provinciaRef: 'madrid', r2023: { escanos: 33, votos: 3_057_000 }, web: 'https://www.voxespana.es',
    programaPresentado: { fecha: '2026-11-12', medio: 'El Debate', url: 'https://www.eldebate.com/espana/20261112/vox-desvela-programa-29n-115-medidas-ceuta-melilla-primer-lugar_480280.html' },
  },
  {
    slug: 'erc', siglas: 'ERC', nombre: 'Esquerra Republicana de Catalunya', color: '#ffb232', logo: '/img/partidos/erc.svg',
    ambito: 'autonómico', provinciaRef: 'barcelona', r2023: { escanos: 7, votos: 466_020 }, web: 'https://www.esquerra.cat',
    programa: { url: 'https://esquerrarepublicana.cat/documents/e2026-programa.pdf', fecha: '2026-11-10' },
  },
  {
    slug: 'junts', siglas: 'JxCat', nombre: 'Junts per Catalunya', color: '#00c3b2', logo: '/img/partidos/junts.svg',
    ambito: 'autonómico', provinciaRef: 'barcelona', r2023: { escanos: 7, votos: 395_429 }, web: 'https://junts.cat',
  },
  {
    slug: 'eh-bildu', siglas: 'EH Bildu', nombre: 'Euskal Herria Bildu', color: '#00a19a', logo: '/img/partidos/bildu.svg',
    ambito: 'autonómico', provinciaRef: 'bizkaia', r2023: { escanos: 6, votos: 335_129 }, web: 'https://ehbildu.eus',
    destacados: ['gipuzkoa'],
  },
  {
    slug: 'pnv', siglas: 'EAJ-PNV', nombre: 'Euzko Alderdi Jeltzalea-Partido Nacionalista Vasco', color: '#008a3e', logo: '/img/partidos/pnv.svg',
    ambito: 'autonómico', provinciaRef: 'bizkaia', r2023: { escanos: 5, votos: 277_289 }, web: 'https://www.eaj-pnv.eus',
  },
  {
    slug: 'bng', siglas: 'BNG', nombre: 'Bloque Nacionalista Galego', color: '#76b3dd', logo: '/img/partidos/bng.svg',
    ambito: 'autonómico', provinciaRef: 'a-coruna', r2023: { escanos: 1, votos: 153_995 }, web: 'https://www.bng.gal',
    programa: { url: 'https://www.bng.gal/media/bnggaliza/files/2026/11/03/26_bng_xerais_documentos_programa_electoral.pdf', fecha: '2026-11-03' },
  },
  {
    slug: 'coalicion-canaria', siglas: 'CCa', nombre: 'Coalición Canaria', color: '#ffd700', logo: '/img/partidos/cca.svg',
    ambito: 'autonómico', provinciaRef: 'santa-cruz-de-tenerife', r2023: { escanos: 1, votos: 116_363 }, web: 'https://coalicioncanaria.org',
    programa: { url: 'https://coalicioncanaria.org/wp-content/uploads/2026/11/CCA-26-Programa_Electoral-29NOV.pdf', fecha: '2026-11-08' },
  },
  {
    slug: 'upn-pp', siglas: 'UPN-PP', nombre: 'Unión del Pueblo Navarro en coalición con el Partido Popular', color: '#2a52be', logo: '/img/partidos/upn.svg',
    ambito: 'autonómico', provinciaRef: 'navarra', r2023: { escanos: 1, votos: 52_188, nota: 'En 2023 UPN se presentó en solitario.' }, web: 'https://www.upn.org',
  },
  {
    slug: 'frente-obrero', siglas: 'FO', nombre: 'Frente Obrero', color: '#b5121b', logo: '/img/partidos/fo.png',
    ambito: 'estatal', provinciaRef: 'madrid', r2023: { escanos: 0, votos: 46_274 }, web: 'https://frenteobrero.es',
  },
  {
    slug: 'salf', siglas: 'SALF', nombre: 'Se Acabó La Fiesta', color: '#7a1f2b', logo: '/img/partidos/salf.png',
    ambito: 'estatal', provinciaRef: 'madrid', r2023: null, nota2023: 'No se presentó a las generales de 2023.',
  },
  {
    slug: 'frente-amplio', siglas: 'FA', nombre: 'Frente Amplio', color: '#e5007d', logo: '/img/partidos/fa.svg',
    ambito: 'estatal', provinciaRef: 'madrid', r2023: null, nota2023: 'Se presenta por primera vez a unas generales.',
    destacados: ['barcelona'],
  },
  {
    slug: 'podemos', siglas: 'PODEMOS', nombre: 'Podemos', color: '#6b2e68', logo: '/img/partidos/podemos.svg',
    ambito: 'estatal', provinciaRef: 'madrid', r2023: null, nota2023: 'En 2023 no se presentó con sus siglas: fue dentro de la coalición Sumar.',
    web: 'https://podemos.info',
  },
  {
    slug: 'pcte', siglas: 'PCTE', nombre: 'Partido Comunista de los Trabajadores de España', color: '#c8102e',
    ambito: 'estatal', provinciaRef: 'madrid', r2023: { escanos: 0, votos: 18_218, nota: 'Incluye PCTC, PCTG y PCTE/ELAK.' }, web: 'https://pcte.es',
  },
  {
    slug: 'pacma', siglas: 'PACMA', nombre: 'Partido Animalista con el Medio Ambiente', color: '#8cc63f', logo: '/img/partidos/pacma.svg',
    ambito: 'estatal', provinciaRef: 'madrid', r2023: { escanos: 0, votos: 169_237 }, web: 'https://pacma.es',
  },
];

/** Siglas con las que aparece cada partido en los resultados de 2023. */
export const SIGLAS_2023: Record<string, string[]> = {
  pp: ['PP'],
  psoe: ['PSOE', 'PSC–PSOE', 'PSdeG–PSOE', 'PSE–EE (PSOE)', 'PSIB–PSOE', 'PSN–PSOE'],
  vox: ['Vox'],
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

/** Fotos libres (Wikimedia Commons) por nombre tal como sale en el BOE. Sin foto libre: iniciales. */
export const FOTOS: Record<string, string> = {
  'Pedro Sánchez Pérez-Castejón': 'sanchez',
  'Alberto Núñez Feijóo': 'feijoo',
  'Santiago Abascal Conde': 'abascal',
  'Luis Alvise Pérez Fernández': 'alvise',
  'Ada Colau Ballano': 'colau',
  'Emilio Delgado Orgaz': 'delgado',
  'Irene Montero Gil': 'montero',
  'Gabriel Rufián Romero': 'rufian',
  'Míriam Nogueras i Camero': 'nogueras',
  'Oskar Matute Garcia de Jalón': 'matute',
  'Néstor Rego Candamil': 'rego',
  'Cristina Valido García': 'valido',
  'Roberto Vaquero Arribas': 'vaquero',
};

export function fotoDe(nombre: string): string | undefined {
  return FOTOS[nombre];
}

export function iniciales(nombre: string): string {
  const p = nombre.replace(/\b(de|del|la|las|los|y|i)\b/gi, '').split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] ?? '') + (p[1]?.[0] ?? '')).toUpperCase();
}

export function getPartido(slug: string): Partido | undefined {
  return PARTIDOS.find((p) => p.slug === slug);
}

/** Listas de una familia en todas las provincias. */
export function listasDe(slug: string): { provincia: Provincia; lista: Lista }[] {
  return PROVINCIAS.flatMap((provincia) =>
    provincia.listas.filter((l) => l.familia === slug).map((lista) => ({ provincia, lista })),
  );
}

/** Cabeza de lista en una provincia. */
export function cabezaEn(slug: string, provinciaSlug: string) {
  const r = listasDe(slug).find((x) => x.provincia.slug === provinciaSlug);
  return r ? { nombre: r.lista.candidatos[0]?.n ?? '', provincia: r.provincia, lista: r.lista } : undefined;
}

/** Orden neutral: escaños de 2023 y, después, número de provincias en las que se presenta. */
export const PARTIDOS_ORDENADOS = [...PARTIDOS].sort(
  (a, b) => (b.r2023?.escanos ?? 0) - (a.r2023?.escanos ?? 0) || listasDe(b.slug).length - listasDe(a.slug).length,
);
