// Ruta: src/lib/datos.ts
// Datos de las elecciones generales del 29-N de 2026.
// - Listas al Congreso: candidaturas proclamadas, BOE núm. 273, de 3 de noviembre de 2026 (BOE-A-2026-23103).
// - Escaños por provincia: anexo del Real Decreto 806/2026, de 5 de octubre (BOE-A-2026-20742).
// - Resultados de 2023: Ministerio del Interior, elecciones al Congreso del 23 de julio de 2023.
// src/data/provincias.json lo genera scripts/datos/preparar.py.
import provinciasJson from '../data/provincias.json';
import creditosJson from '../data/creditos.json';

export interface Persona {
  n: string;
  nota?: string;
}

export interface Lista {
  siglas: string;
  nombre: string;
  familia: string | null;
  candidatos: Persona[];
  suplentes: Persona[];
}

export interface Resultado2023 {
  siglas: string;
  votos: number;
  pct: number;
  escanos: number;
}

export interface Provincia {
  slug: string;
  nombre: string;
  comunidad: string;
  escanos: number;
  escanos2023: number;
  senado: { isla: string; senadores: number }[];
  listas: Lista[];
  r2023: {
    censo: number;
    votantes: number;
    validos: number;
    blancos: number;
    nulos: number;
    abstencion: number;
    partidos: Resultado2023[];
  };
}

export const PROVINCIAS = provinciasJson as Provincia[];

export function getProvincia(slug: string): Provincia {
  const p = PROVINCIAS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Provincia desconocida: ${slug}`);
  return p;
}

/** Comunidades en orden alfabético con sus provincias. */
export const COMUNIDADES = [...new Set(PROVINCIAS.map((p) => p.comunidad))]
  .sort((a, b) => a.localeCompare(b, 'es'))
  .map((c) => ({ nombre: c, provincias: PROVINCIAS.filter((p) => p.comunidad === c) }));

// ─── Fechas clave (hora peninsular) ─────────────────────────────────────────────
export const ELECCION = {
  fecha: '2026-11-29',
  /** Apertura de los colegios: domingo 29 de noviembre, 9:00 (UTC+1). */
  apertura: '2026-11-29T09:00:00+01:00',
  cierre: '2026-11-29T20:00:00+01:00',
  decreto: { nombre: 'Real Decreto 806/2026, de 5 de octubre', boe: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742' },
  proclamadas: { nombre: 'BOE núm. 273, de 3 de noviembre de 2026', boe: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23103' },
} as const;

export interface Hito {
  fecha: string;
  /** Instante en que termina o empieza el hito, para las cuentas atrás. */
  limite: string;
  titulo: string;
  texto: string;
  href?: string;
  clave?: boolean;
}

export const CALENDARIO: Hito[] = [
  { fecha: '2026-10-06', limite: '2026-10-06T00:00:00+02:00', titulo: 'Convocatoria en el BOE', texto: 'Se publica el Real Decreto 806/2026 de disolución de las Cortes y convocatoria de elecciones.' },
  { fecha: '2026-11-03', limite: '2026-11-03T00:00:00+01:00', titulo: 'Candidaturas proclamadas', texto: 'El BOE publica todas las listas al Congreso y al Senado que se presentan en cada provincia.', href: '/provincias' },
  { fecha: '2026-11-09', limite: '2026-11-09T00:00:00+01:00', titulo: 'Empiezan a llegar los votos por correo', texto: 'La Oficina del Censo Electoral empieza a enviar la documentación a quien ya lo ha pedido.', href: '/voto-por-correo' },
  { fecha: '2026-11-13', limite: '2026-11-13T00:00:00+01:00', titulo: 'Empieza la campaña', texto: 'A las 0:00 del viernes 13 empieza la campaña electoral, que dura 15 días.' },
  { fecha: '2026-11-19', limite: '2026-11-20T00:00:00+01:00', titulo: 'Último día para pedir el voto por correo', texto: 'La solicitud se puede hacer hasta el jueves 19 en Correos o en su web.', href: '/voto-por-correo', clave: true },
  { fecha: '2026-11-24', limite: '2026-11-24T00:00:00+01:00', titulo: 'Prohibido publicar encuestas', texto: 'Desde el martes 24 y hasta el cierre de los colegios no se pueden publicar ni difundir sondeos (LOREG, art. 69.7).' },
  { fecha: '2026-11-25', limite: '2026-11-26T00:00:00+01:00', titulo: 'Último día para enviar el voto por correo', texto: 'El sobre con tu voto tiene que estar en Correos como tarde el miércoles 25.', href: '/voto-por-correo', clave: true },
  { fecha: '2026-11-27', limite: '2026-11-28T00:00:00+01:00', titulo: 'Fin de la campaña', texto: 'La campaña termina a las 24:00 del viernes 27.' },
  { fecha: '2026-11-28', limite: '2026-11-29T00:00:00+01:00', titulo: 'Jornada de reflexión', texto: 'Sábado sin actos de campaña ni petición de voto.' },
  { fecha: '2026-11-29', limite: '2026-11-29T20:00:00+01:00', titulo: 'Día de las elecciones', texto: 'Los colegios abren de 9:00 a 20:00. Después empieza el recuento.', href: '/donde-voto-y-que-llevar', clave: true },
  { fecha: '2026-12-23', limite: '2026-12-23T10:00:00+01:00', titulo: 'Se constituyen las Cortes', texto: 'El Congreso y el Senado nuevos se reúnen a las 10:00 del miércoles 23 de diciembre.' },
];

// ─── Formato ────────────────────────────────────────────────────────────────────
const nf = new Intl.NumberFormat('es-ES');
export const num = (n: number) => nf.format(Math.round(n));
export const pct = (n: number, d = 1) =>
  new Intl.NumberFormat('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n) + ' %';
export const fechaLarga = (iso: string) =>
  new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Madrid' }).format(new Date(`${iso}T12:00:00Z`));
export const fechaCorta = (iso: string) =>
  new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', timeZone: 'Europe/Madrid' }).format(new Date(`${iso}T12:00:00Z`)).replace('.', '');

/** Días enteros que faltan (hora de Madrid) desde la fecha del build. */
export function diasHasta(iso: string, desde = new Date()): number {
  const hoy = new Date(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(desde) + 'T00:00:00Z');
  return Math.round((new Date(`${iso.slice(0, 10)}T00:00:00Z`).getTime() - hoy.getTime()) / 86_400_000);
}

// ─── Créditos de las imágenes (Wikimedia Commons) ──────────────────────────────
export interface Credito {
  archivo: string;
  url: string;
  autor: string;
  licencia: string;
}
export const CREDITOS = creditosJson as Record<string, Credito>;

// ─── Cálculos ───────────────────────────────────────────────────────────────────
/** Electores (censo de 2023) por cada escaño de 2026. */
export const electoresPorEscano = (p: Provincia) => p.r2023.censo / p.escanos;

/** Votos a candidaturas que no sacaron escaño en esa provincia en 2023 (sin contar blancos ni nulos). */
export const votosSinEscano = (p: Provincia) =>
  p.r2023.partidos.filter((x) => x.escanos === 0).reduce((s, x) => s + x.votos, 0);

/**
 * Reparto D'Hondt (LOREG art. 163): fuera las candidaturas con menos del 3 % de los votos válidos
 * (que incluyen el voto en blanco); el resto, cocientes votos/1, votos/2… y se adjudican los mayores.
 * En empate, gana la candidatura con más votos.
 */
export function dhondt(votos: { id: string; votos: number }[], escanos: number, validos: number): Record<string, number> {
  const minimo = validos * 0.03;
  const aptas = votos.filter((v) => v.votos > 0 && v.votos >= minimo);
  const cocientes = aptas.flatMap((v) => Array.from({ length: escanos }, (_, i) => ({ id: v.id, q: v.votos / (i + 1), v: v.votos })));
  cocientes.sort((a, b) => b.q - a.q || b.v - a.v);
  const res: Record<string, number> = Object.fromEntries(votos.map((v) => [v.id, 0]));
  for (const c of cocientes.slice(0, escanos)) res[c.id]++;
  return res;
}
