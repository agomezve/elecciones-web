// Adaptador de la web de resultados provisionales del Ministerio del Interior.
//
// Interior aún no ha publicado la web de resultados del 29-N (29neleccionesgenerales.es no la tiene a 3-nov-2026),
// así que el formato no se conoce. La noche del 29-N, en cuanto salga, se completa esta función para que devuelva,
// por slug de provincia (los de src/data/provincias.json):
//   { escrutado, censo, censoEscrutado?, votantes, blancos, nulos, partidos: [{ siglas, votos, escanos? }] }
export async function leerInterior(url, provincias) {
  void provincias;
  throw new Error(`Adaptador de Interior sin conectar todavía (${url}). Ver scripts/escrutinio/interior.mjs.`);
}
