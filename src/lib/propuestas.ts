// Ruta: src/lib/propuestas.ts
// Propuestas de cada partido para el 29-N. Mientras un partido no publique su programa, se recoge lo que
// el partido o sus candidatos han dicho en público, cada medida con su fuente (medio, fecha y enlace).
// Cuando publique el programa, sus medidas se añaden con origen 'programa' y se quitan las que no estén.
// Regla de neutralidad: medidas parafraseadas sin valorar, mismos temas para todos y nada sin fuente.

export type Origen = 'programa' | 'documento' | 'declaracion' | 'gobierno';

export const ORIGENES: Record<Origen, { nombre: string; clase: string }> = {
  programa: { nombre: 'Programa del 29-N', clase: 'bg-emerald-100 text-emerald-800' },
  documento: { nombre: 'Documento del partido', clase: 'bg-indigo-100 text-indigo-800' },
  declaracion: { nombre: 'Declaración pública', clase: 'bg-amber-100 text-amber-900' },
  gobierno: { nombre: 'Decreto del Gobierno', clase: 'bg-slate-200 text-slate-800' },
};

export const TEMAS = [
  { id: 'vivienda', nombre: 'Vivienda' },
  { id: 'impuestos', nombre: 'Impuestos' },
  { id: 'empleo', nombre: 'Empleo y salarios' },
  { id: 'pensiones', nombre: 'Pensiones' },
  { id: 'inmigracion', nombre: 'Inmigración y fronteras' },
  { id: 'instituciones', nombre: 'Instituciones y gasto público' },
  { id: 'servicios', nombre: 'Sanidad y educación' },
  { id: 'seguridad', nombre: 'Seguridad y justicia' },
  { id: 'economia', nombre: 'Energía, campo e infraestructuras' },
  { id: 'exterior', nombre: 'Europa y defensa' },
] as const;
export type Tema = (typeof TEMAS)[number]['id'];

export interface Fuente {
  medio: string;
  url: string;
  /** AAAA-MM-DD */
  fecha: string;
}

export interface Propuesta {
  tema: Tema;
  texto: string;
  /** Quién lo dijo, si no es el propio partido o su candidato principal. */
  quien?: string;
  origen: Origen;
  fuente: Fuente;
}

// ─── Fuentes ───────────────────────────────────────────────────────────────────
const F = {
  ppContrato: { medio: 'El Español', url: 'https://www.elespanol.com/espana/politica/20261019/compromisos-feijoo-contrato-espana-garantizar-pensiones-ordenar-inmigracion/1003744426020_0.html', fecha: '2026-10-19' },
  ppContrato2: { medio: 'Moncloa.com', url: 'https://www.moncloa.com/2026/10/19/feijoo-espana-3451414/', fecha: '2026-10-19' },
  psoeForbes: { medio: 'Forbes España', url: 'https://forbes.es/actualidad/1036705/elecciones-2026-batallas-economicas-29-n/', fecha: '2026-10-05' },
  psoeDecretos: { medio: 'Vozpópuli', url: 'https://www.vozpopuli.com/espana/politica/comparecencia-de-pedro-sanchez-en-directo-adelanto-de-las-elecciones-generales-aprobacion-de-los-decretos-de-vivienda-en-consejo-de-ministros-y-ultima-hora-hoy.html', fecha: '2026-10-06' },
  voxDebate: { medio: 'El Debate', url: 'https://www.eldebate.com/espana/20261024/diez-propuestas-clave-vox-espana-ante-29n_471660.html', fecha: '2026-10-24' },
  voxDemocrata: { medio: 'Demócrata', url: 'https://www.democrata.es/elecciones-generales-espana/abascal-advierte-elecciones-29n-no-seran-limpias-fija-tres-condiciones-pactar-con-feijoo/', fecha: '2026-10-18' },
  faActo: { medio: 'Libertad Digital', url: 'https://www.libertaddigital.com/espana/politica/2026-10-17/llega-el-frente-amplio-con-la-candidate-ada-colau-entre-gritos-guerracivilistas-abucheos-a-milei-y-reproches-7477668/', fecha: '2026-10-17' },
  faPublico: { medio: 'Público', url: 'https://www.publico.es/politica/partidos/cuatro-partidos-frente-amplio-eligen-ada-colau-candidata-presidencia-gobierno.html', fecha: '2026-10-12' },
  faTren: { medio: 'Infobae (EFE)', url: 'https://infobae.com/espana/agencias/2026/10/31/emilio-delgado-frente-amplio-mas-alla-de-dimisiones-pedimos-mas-inversion-ferroviaria', fecha: '2026-10-31' },
  podWeb: { medio: 'Diario Red', url: 'https://www.diario-red.com/espana/irene-montero-lanza-web-campana-29n-llama-organizar-voluntarios-barrios-municipios/20261020180948078764.html', fecha: '2026-10-21' },
  podEP: { medio: 'Periódico de Ibiza (Europa Press)', url: 'https://www.periodicodeibiza.es/noticias/elecciones-29n/2026/10/28/2737933/irene-montero-propone-prohibir-especulacion-casa-puede-comprar-para-hacer-negocio.html', fecha: '2026-10-28' },
  salfVistalegre: { medio: 'Demócrata', url: 'https://www.democrata.es/politica/alvise-perez-acabo-fiesta-elecciones-generales-deportaciones-referendum-ue/', fecha: '2025-10-12' },
} satisfies Record<string, Fuente>;

// ─── Propuestas por partido (slug de partidos.ts) ──────────────────────────────
export const PROPUESTAS: Record<string, Propuesta[]> = {
  pp: [
    { tema: 'vivienda', texto: 'Construir un millón de viviendas, con ayudas para los jóvenes y menos trámites para liberar suelo.', origen: 'documento', fuente: F.ppContrato },
    { tema: 'vivienda', texto: 'Desalojar a los okupas en 48 horas.', origen: 'documento', fuente: F.ppContrato2 },
    { tema: 'impuestos', texto: 'Revisar una a una las más de cien subidas de impuestos de los últimos años y bajar la presión fiscal.', origen: 'documento', fuente: F.ppContrato },
    { tema: 'empleo', texto: 'Subir el salario medio aumentando la productividad y que trabajar compense más que los subsidios.', origen: 'documento', fuente: F.ppContrato },
    { tema: 'pensiones', texto: 'Garantizar las pensiones actuales y futuras y revalorizarlas con el IPC dentro del Pacto de Toledo.', origen: 'documento', fuente: F.ppContrato },
    { tema: 'inmigracion', texto: 'Reducir la inmigración irregular, endurecer el acceso a la nacionalidad y no hacer regularizaciones colectivas.', origen: 'documento', fuente: F.ppContrato },
    { tema: 'instituciones', texto: 'Que los jueces elijan a los jueces, aprobar Presupuestos cada año y convocar elecciones si se encadenan prórrogas.', origen: 'documento', fuente: F.ppContrato },
    { tema: 'instituciones', texto: 'Menos ministerios, altos cargos y asesores, y una auditoría del gasto público.', origen: 'documento', fuente: F.ppContrato },
    { tema: 'servicios', texto: 'Más médicos con mejores condiciones, una educación más exigente y el castellano garantizado en toda España.', origen: 'documento', fuente: F.ppContrato },
    { tema: 'seguridad', texto: 'Más recursos y reconocimiento para las Fuerzas y Cuerpos de Seguridad del Estado.', origen: 'documento', fuente: F.ppContrato },
    { tema: 'economia', texto: 'Invertir en infraestructuras hídricas frente a sequías e inundaciones y recuperar el ferrocarril.', origen: 'documento', fuente: F.ppContrato },
  ],
  psoe: [
    { tema: 'vivienda', texto: 'Crear una Empresa Estatal de Vivienda y llevar el parque público de vivienda por encima del 6 % del total.', origen: 'documento', fuente: F.psoeForbes },
    { tema: 'vivienda', texto: 'Préstamos de hasta 50.000 € para la primera vivienda, con una línea de 10.000 millones.', quien: 'Pedro Sánchez, al presentar los decretos de vivienda', origen: 'gobierno', fuente: F.psoeDecretos },
    { tema: 'vivienda', texto: 'Que los inquilinos se desgraven parte del alquiler y prorrogar dos años los contratos limitando las subidas.', quien: 'Pedro Sánchez, al presentar los decretos de vivienda', origen: 'gobierno', fuente: F.psoeDecretos },
    { tema: 'impuestos', texto: 'Que los pisos turísticos tributen como un negocio y ligar las ventajas fiscales de las socimis al alquiler social.', quien: 'Pedro Sánchez, al presentar los decretos de vivienda', origen: 'gobierno', fuente: F.psoeDecretos },
    { tema: 'empleo', texto: 'Reducir la jornada laboral hasta 36 horas semanales antes de 2030.', origen: 'documento', fuente: F.psoeForbes },
    { tema: 'empleo', texto: 'Que el salario mínimo equivalga al 60 % del salario medio.', origen: 'documento', fuente: F.psoeForbes },
    { tema: 'empleo', texto: 'Aprobar un Estatuto del Becario y que los autónomos coticen por sus ingresos reales.', origen: 'documento', fuente: F.psoeForbes },
  ],
  vox: [
    { tema: 'inmigracion', texto: '«Prioridad nacional»: que los españoles sean los primeros en recibir ayudas sociales, ayudas al alquiler y plazas de guardería.', origen: 'declaracion', fuente: F.voxDebate },
    { tema: 'inmigracion', texto: '«Remigración»: repatriar a quien entra ilegalmente, deportar a quien delinque y a quien vive de ayudas sin contribuir.', origen: 'declaracion', fuente: F.voxDebate },
    { tema: 'inmigracion', texto: 'Desplegar al Ejército de forma permanente en las fronteras de Ceuta y Melilla.', origen: 'declaracion', fuente: F.voxDemocrata },
    { tema: 'impuestos', texto: 'IRPF con mínimo exento de 22.000 €, un 15 % hasta 70.000 € y un 25 % por encima, y cuatro puntos menos por hijo.', origen: 'declaracion', fuente: F.voxDebate },
    { tema: 'impuestos', texto: 'Bajar el IVA reducido al 8 % y el general al 18 %.', origen: 'declaracion', fuente: F.voxDebate },
    { tema: 'empleo', texto: 'Quitar la cuota de autónomos a quien ingrese menos que el salario mínimo.', origen: 'declaracion', fuente: F.voxDebate },
    { tema: 'vivienda', texto: 'Liberalizar el suelo salvo zonas protegidas, bajar impuestos a promotores y compradores y endurecer la respuesta a la okupación.', origen: 'declaracion', fuente: F.voxDemocrata },
    { tema: 'pensiones', texto: 'Capitalizar un fondo de pensiones público; Abascal niega que quiera privatizar las pensiones.', origen: 'declaracion', fuente: F.voxDebate },
    { tema: 'instituciones', texto: 'Acabar con las subvenciones a partidos, sindicatos y patronales y auditar el gasto no imprescindible.', origen: 'declaracion', fuente: F.voxDebate },
    { tema: 'servicios', texto: 'Un plan nacional de sanidad y una ley nacional de educación.', origen: 'declaracion', fuente: F.voxDebate },
    { tema: 'economia', texto: 'Derogar la normativa del Pacto Verde Europeo, aprobar un Plan Nacional del Agua y mantener las centrales nucleares.', origen: 'declaracion', fuente: F.voxDebate },
  ],
  'frente-amplio': [
    { tema: 'vivienda', texto: 'Intervenir el mercado de la vivienda.', quien: 'Ada Colau, candidata a la Presidencia', origen: 'declaracion', fuente: F.faActo },
    { tema: 'vivienda', texto: 'Controlar los precios del alquiler.', quien: 'Verónica Martínez Barbero', origen: 'declaracion', fuente: F.faActo },
    { tema: 'vivienda', texto: 'Plantar cara a los fondos buitre y garantizar el derecho a la vivienda.', quien: 'Texto conjunto de IU, Más Madrid, Movimiento Sumar y Comuns', origen: 'documento', fuente: F.faPublico },
    { tema: 'empleo', texto: 'Seguir subiendo el salario mínimo.', quien: 'Ernest Urtasun', origen: 'declaracion', fuente: F.faActo },
    { tema: 'empleo', texto: 'Gravar la inteligencia artificial, repartir sus beneficios y reducir la jornada laboral.', quien: 'Emilio Delgado', origen: 'declaracion', fuente: F.faActo },
    { tema: 'impuestos', texto: 'Subir los impuestos a las eléctricas.', quien: 'Ernest Urtasun', origen: 'declaracion', fuente: F.faActo },
    { tema: 'economia', texto: 'Más inversión y más personal en la red ferroviaria.', quien: 'Emilio Delgado', origen: 'declaracion', fuente: F.faTren },
  ],
  podemos: [
    { tema: 'vivienda', texto: 'Prohibir comprar vivienda para especular con ella.', origen: 'declaracion', fuente: F.podEP },
    { tema: 'vivienda', texto: 'Bajar los alquileres un 40 %.', origen: 'declaracion', fuente: F.podEP },
    { tema: 'vivienda', texto: 'Expropiar las viviendas de los «fondos buitre» para alquilarlas como vivienda social.', origen: 'declaracion', fuente: F.podEP },
    { tema: 'empleo', texto: 'Salario mínimo de 1.800 € por ley y jornada laboral de 30 horas semanales.', origen: 'declaracion', fuente: F.podWeb },
    { tema: 'economia', texto: 'Expropiar empresas estratégicas, como las de energía y alimentación.', origen: 'declaracion', fuente: F.podEP },
    { tema: 'servicios', texto: 'Más recursos, más profesionales y mejores salarios en la sanidad y la educación públicas.', origen: 'declaracion', fuente: F.podWeb },
    { tema: 'exterior', texto: 'No destinar «ni un euro más» a armamento.', origen: 'declaracion', fuente: F.podWeb },
  ],
  salf: [
    { tema: 'impuestos', texto: 'IRPF del 0 % para quien gane menos de 35.000 € al año y cinco puntos menos por cada hijo.', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'inmigracion', texto: 'Un plan de deportación masiva de inmigrantes en situación irregular y suprimir ayudas a países como Marruecos.', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'seguridad', texto: 'Cárceles de máxima seguridad «al estilo de El Salvador», con trabajo obligatorio para reducir condena.', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'seguridad', texto: 'Que no haya tercer grado para los condenados por corrupción que no devuelvan el dinero.', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'instituciones', texto: 'Eliminar la financiación pública de partidos, sindicatos y medios de comunicación.', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'vivienda', texto: 'Eliminar trabas a la construcción de vivienda.', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'pensiones', texto: 'Reformar el sistema de pensiones (sin detallar cómo).', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'exterior', texto: 'Un referéndum sobre la permanencia de España en la Unión Europea.', origen: 'declaracion', fuente: F.salfVistalegre },
  ],
};

export const propuestasDe = (slug: string) => PROPUESTAS[slug] ?? [];

/** Fecha (AAAA-MM-DD) de la fuente más reciente de un partido. */
export const ultimaFuente = (slug: string) =>
  propuestasDe(slug).reduce((max, p) => (p.fuente.fecha > max ? p.fuente.fecha : max), '');

/** Fecha de la última revisión de las propuestas (se cambia a mano en cada revisión). */
export const REVISADO = '2026-11-03';
