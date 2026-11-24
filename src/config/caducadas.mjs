// Ruta: src/config/caducadas.mjs
// Modo después de las elecciones y páginas que caducan con el 29-N.
// Está en .mjs (y no en site.ts) porque también lo lee astro.config.mjs para el sitemap.

/**
 * Modo después de las elecciones. Se cambia a true el 30-nov (y push, con el OK de Aarón):
 * la portada pasa a resultados, la cabecera y el menú dejan de llevar al voto por correo,
 * la FAQ quita los plazos ya cerrados y las páginas de CADUCADAS pasan a noindex y salen del sitemap.
 */
export const POST_ELECCIONES = false;

/**
 * Páginas que solo sirven hasta el 29-N. Con POST_ELECCIONES = true llevan noindex y salen del sitemap,
 * pero siguen publicadas y enlazadas (no se borra nada). Rutas sin barra final.
 */
export const CADUCADAS = [
  /^\/provincias\/[^/]+$/, // candidatos al Congreso de cada provincia
  /^\/provincias\/[^/]+\/senado$/, // candidatos al Senado de cada provincia
  /^\/voto-por-correo$/,
  /^\/donde-voto-y-que-llevar$/,
  /^\/permiso-para-votar$/,
  /^\/mesa-electoral$/,
];

/** @param {string} ruta ruta o URL completa */
export function caducada(ruta) {
  if (!POST_ELECCIONES) return false;
  const path = ruta.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') || '/';
  return CADUCADAS.some((re) => re.test(path));
}
