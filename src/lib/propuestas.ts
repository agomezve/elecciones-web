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
  { id: 'animales', nombre: 'Animales y medio ambiente' },
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
export const F = {
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
  foEntrevista: { medio: 'El Diario de Madrid', url: 'https://www.eldiariodemadrid.es/articulo/entrevistas/roberto-vaquero-frente-obrero-sistema-politico/20261031102036145765.html', fecha: '2026-10-31' },
  foPrograma: { medio: 'Frente Obrero (programa «Un programa para recuperar España», en su web)', url: 'https://frenteobrero.es/wp-content/uploads/2026/10/Programa.pdf', fecha: '2026-10-07' },
  foCircunscripciones: { medio: 'ESdiario', url: 'https://www.esdiario.com/nacional/261026/201315/roberto-vaquero-anuncia-frente-obrero-estara-52-circunscripciones-29-n.html', fecha: '2026-10-26' },
  pacma30: { medio: 'PACMA', url: 'https://pacma.es/actualidad/pacma-concurrira-a-las-elecciones-generales-del-29n-en-30-provincias/', fecha: '2026-11-03' },
  pcteCantabria: { medio: 'Cantabria al Día', url: 'https://cantabrialdia.com/pcte-pablo-isidro-alfredo-ramos-elecciones/', fecha: '2026-11-02' },
  salfVistalegre: { medio: 'Demócrata', url: 'https://www.democrata.es/politica/alvise-perez-acabo-fiesta-elecciones-generales-deportaciones-referendum-ue/', fecha: '2025-10-12' },
  ppPrograma: { medio: 'Partido Popular (programa «La reconstrucción nacional», en su web)', url: 'https://www.pp.es/wp-content/uploads/2026/11/LA-RECONSTRUCCION-NACIONAL.pdf', fecha: '2026-11-10' },
  voxPrograma: { medio: 'El Debate (programa de VOX para el 29-N)', url: 'https://www.eldebate.com/espana/20261112/vox-desvela-programa-29n-115-medidas-ceuta-melilla-primer-lugar_480280.html', fecha: '2026-11-12' },
  ercPrograma: { medio: 'ERC (programa «Pel país. Per la gent. Pel futur.», en su web)', url: 'https://esquerrarepublicana.cat/documents/e2026-programa.pdf', fecha: '2026-11-10' },
  bngPrograma: { medio: 'BNG (programa electoral «29N. Xerais 2026», en su web)', url: 'https://www.bng.gal/media/bnggaliza/files/2026/11/03/26_bng_xerais_documentos_programa_electoral.pdf', fecha: '2026-11-03' },
  psoePrograma: { medio: 'PSOE (programa «La fuerza de seguir avanzando», en su web)', url: 'https://lafuerzadelagente.es/programa/PROGRAMA_PSOE_29N26.pdf', fecha: '2026-11-15' },
  pnvPrograma: { medio: 'EAJ-PNV (programa «Euskadi Zaindu. Defendemos Euskadi», en su web)', url: 'https://www.eaj-pnv.eus/es/adjuntos-documentos/21765/pdf/programa-electoral-29n', fecha: '2026-11-10' },
  bilduPrograma: { medio: 'EH Bildu (programa electoral del 29-N, en su web)', url: 'https://posibleegin.ehbildu.eus/wp-content/uploads/2026/11/PROGRAMA-CAS.pdf', fecha: '2026-11-16' },
  faPrograma: { medio: 'Frente Amplio (programa electoral del 29-N, en su web)', url: 'https://frenteamplio.info/pdf/ProgramaFrenteAmplio.pdf', fecha: '2026-11-17' },
  podPrograma: { medio: 'Podemos (programa «Paz, casa y trabajo», en su web)', url: 'https://podemos.info/wp-content/uploads/2026/11/29N-programa-Podemos.-Paz-casa-y-trabajo.pdf', fecha: '2026-11-17' },
  juntsPrograma: { medio: 'Infobae (EFE, sobre el programa de Junts para el 29-N)', url: 'https://www.infobae.com/espana/agencias/2026/11/18/junts-propone-desocupaciones-expres-y-una-moratoria-hasta-2028-a-que-la-banca-compre-pisos/', fecha: '2026-11-18' },
  salfContrato: { medio: 'The Objective (sobre el «contrato electoral» de SALF)', url: 'https://theobjective.com/espana/politica/2026-11-10/alvise-megacarcel-diputado/', fecha: '2026-11-10' },
  ccPrograma: { medio: 'Coalición Canaria (programa «Defiende Canarias», en su web)', url: 'https://coalicioncanaria.org/wp-content/uploads/2026/11/CCA-26-Programa_Electoral-29NOV.pdf', fecha: '2026-11-08' },
} satisfies Record<string, Fuente>;

// ─── Propuestas por partido (slug de partidos.ts) ──────────────────────────────
export const PROPUESTAS: Record<string, Propuesta[]> = {
  'eh-bildu': [
    { tema: 'vivienda', texto: 'Contratos de alquiler con prórroga automática, una subida máxima del 2 % al año y prohibir de forma permanente desahuciar a familias vulnerables sin alternativa habitacional, con compensación estatal.', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'vivienda', texto: 'Prohibir la compra especulativa de vivienda por fondos y grandes tenedores, eliminar las SOCIMI como promotoras y aplicar un IVA del 21 % a los pisos turísticos de corta duración.', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'empleo', texto: 'Jornada de 32 horas o de cuatro días sin bajar el sueldo (en las pymes, primero a 35 horas) e indemnización por despido improcedente de al menos 45 días.', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'empleo', texto: 'Que las comunidades puedan fijar un salario mínimo propio por encima del estatal.', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'pensiones', texto: 'Pensiones mínimas de al menos 1.220 € ligadas al salario mínimo, subir al menos un 15 % las de viudedad y no contributivas, revalorización con el IPC y jubilación sin penalización con 40 años cotizados.', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'impuestos', texto: 'Subir el impuesto a la banca y a las grandes fortunas y crear uno nuevo sobre los beneficios de las grandes distribuidoras de alimentación, gestionados por las haciendas forales.', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'economia', texto: 'Derogar la reforma del artículo 135 de la Constitución, que da prioridad al pago de la deuda, y mantener el calendario de cierre de las centrales nucleares.', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'instituciones', texto: 'Reconocer a Euskal Herria como nación y el derecho a decidir del pueblo vasco, defender el Concierto Económico y el Convenio navarro y traspasar el régimen económico de la Seguridad Social.', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'seguridad', texto: 'Repliegue de la Policía Nacional y la Guardia Civil en Euskadi y Navarra y derogar la Ley de Secretos Oficiales.', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'inmigracion', texto: 'Rechazar las partes restrictivas del Pacto Europeo de Migración y Asilo, las devoluciones sumarias y los centros de internamiento de extranjeros (CIE).', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'servicios', texto: 'Incluir la salud bucodental y los productos ópticos en la sanidad pública para los colectivos más vulnerables y derogar la Ley 15/1997 de gestión sanitaria.', origen: 'programa', fuente: F.bilduPrograma },
    { tema: 'exterior', texto: 'Rechazar la OTAN y el aumento del gasto en defensa, cerrar el campo de tiro de las Bardenas y adherirse al Tratado sobre la Prohibición de las Armas Nucleares.', origen: 'programa', fuente: F.bilduPrograma },
  ],
  junts: [
    { tema: 'vivienda', texto: 'Prohibir hasta 2028 que los bancos, sus inmobiliarias, los fondos de inversión y las gestoras de activos compren vivienda.', origen: 'programa', fuente: F.juntsPrograma },
    { tema: 'vivienda', texto: 'Traspasar gratis a la Generalitat las viviendas y el suelo de la Sareb y de Casa 47 en Cataluña, que el Estado dedique a vivienda lo mismo que la media europea y más vivienda privada asequible con incentivos.', origen: 'programa', fuente: F.juntsPrograma },
    { tema: 'vivienda', texto: 'Que el Estado, y no el pequeño propietario, asuma la protección de las familias vulnerables, pagando al propietario en dos meses como máximo.', origen: 'programa', fuente: F.juntsPrograma },
    { tema: 'impuestos', texto: 'Bajar los impuestos de la vivienda a inquilinos, compradores y propietarios que alquilen.', origen: 'programa', fuente: F.juntsPrograma },
    { tema: 'seguridad', texto: 'Desalojar las ocupaciones ilegales en 48 horas como máximo con un juicio inmediato, y una ley orgánica para que la policía desaloje en el momento si detecta la ocupación al producirse.', origen: 'programa', fuente: F.juntsPrograma },
    { tema: 'instituciones', texto: 'Que cualquier referéndum acordado con el Estado ofrezca la misma elección que el 1-O y «garantizar el derecho de Cataluña a su autodeterminación».', origen: 'programa', fuente: F.juntsPrograma },
    { tema: 'instituciones', texto: 'Un concierto económico para Cataluña y el traspaso de Rodalies.', quien: 'Míriam Nogueras, candidata, en campaña', origen: 'declaracion', fuente: F.juntsPrograma },
    { tema: 'inmigracion', texto: 'El traspaso a Cataluña de las competencias de inmigración.', quien: 'Míriam Nogueras, candidata, en campaña', origen: 'declaracion', fuente: F.juntsPrograma },
  ],
  pnv: [
    { tema: 'vivienda', texto: 'Evitar que se usen contratos de temporada para saltarse los derechos de quien alquila su vivienda habitual, y facilitar a los jóvenes la primera vivienda en alquiler o en propiedad.', origen: 'programa', fuente: F.pnvPrograma },
    { tema: 'empleo', texto: 'Que Euskadi tenga competencia para fijar un salario mínimo propio, superior al estatal y adaptado al coste de vida.', origen: 'programa', fuente: F.pnvPrograma },
    { tema: 'empleo', texto: 'Ampliar la prestación contributiva por desempleo de 24 a 36 meses como máximo.', origen: 'programa', fuente: F.pnvPrograma },
    { tema: 'impuestos', texto: 'Revisar el IVA de algunos alimentos y bienes esenciales y dar a las Haciendas Forales más capacidad sobre el IVA y los Impuestos Especiales.', origen: 'programa', fuente: F.pnvPrograma },
    { tema: 'pensiones', texto: 'Mantener la revalorización de las pensiones con el IPC y quitar la penalización por jubilación anticipada a quien haya cotizado más de 40 años.', origen: 'programa', fuente: F.pnvPrograma },
    { tema: 'economia', texto: 'Calendarios verificables para la Y vasca y el Corredor Atlántico, e inversión en redes eléctricas para abaratar la energía.', origen: 'programa', fuente: F.pnvPrograma },
    { tema: 'seguridad', texto: 'Reformas legales contra la multirreincidencia, reformar la Ley de Seguridad Ciudadana y la de secretos oficiales.', origen: 'programa', fuente: F.pnvPrograma },
    { tema: 'inmigracion', texto: 'Más competencias para Euskadi en acogida, permisos de residencia y trabajo e integración, y menos esperas para homologar títulos extranjeros.', origen: 'programa', fuente: F.pnvPrograma },
    { tema: 'instituciones', texto: 'Completar las transferencias del Estatuto de Gernika, proteger el Concierto Económico y una nueva relación con el Estado basada en el reconocimiento nacional de Euskadi.', origen: 'programa', fuente: F.pnvPrograma },
  ],
  pp: [
    { tema: 'vivienda', texto: 'Construir un millón de viviendas con una nueva Ley del Suelo, licencias de obra en tres meses con silencio positivo y vivienda social en suelo dotacional.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'vivienda', texto: 'Derogar la Ley de Vivienda y eliminar las zonas tensionadas y el índice de precios del alquiler.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'vivienda', texto: 'IVA del 4 % (en vez del 10 %) en la compra de la primera vivienda para menores de 40 años, aval público de hasta el 20 % y una «Hucha Hogar Joven» con deducción del 20 %.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'vivienda', texto: 'Deducción en el IRPF para los inquilinos y para el propietario que renueve tres años más subiendo la renta por debajo del IPC.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'vivienda', texto: 'Que el propietario recupere su vivienda ocupada en 48 horas por orden judicial y que el ocupa no pueda empadronarse.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'impuestos', texto: 'Que quien cobre el salario mínimo no pague IRPF, deflactar la tarifa con la inflación y bajar el IRPF a rentas medias, bajas y familias.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'impuestos', texto: 'Los jóvenes de 18 a 35 años no pagarán IRPF el primer año y pagarán un 75 %, 50 % y 25 % menos los tres siguientes.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'impuestos', texto: 'IVA del 0 % para los alimentos básicos, incluidos carne, pescado y conservas, mientras dure la crisis de inflación.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'empleo', texto: 'Los nuevos autónomos no pagarán cuota el primer año, ni el segundo si no llegan al salario mínimo; quien facture menos de 85.000 € no tendrá que declarar el IVA.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'pensiones', texto: 'Garantizar que las pensiones suban cada año con el IPC y reconstruir el Pacto de Toledo.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'inmigracion', texto: 'Cupos anuales de inmigración laboral por sectores, visados por puntos y prohibir por ley las regularizaciones masivas.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'inmigracion', texto: 'Identificar en siete días a quien entre de forma irregular, devolverlo sin demora y que el rechazo en frontera incluya las entradas a nado en Ceuta y Melilla.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'instituciones', texto: 'Que los jueces elijan a los doce vocales judiciales del CGPJ y que una segunda prórroga de los Presupuestos obligue a convocar elecciones.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'instituciones', texto: 'Menos ministerios, altos cargos y asesores, y fusionar o cerrar organismos duplicados.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'instituciones', texto: 'Derogar la Ley de Amnistía y recuperar en el Código Penal los delitos de sedición y de convocatoria de referéndum ilegal.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'servicios', texto: 'Al menos 4.500 médicos más en Atención Primaria y un Pacto de Estado por la Sanidad para reducir las listas de espera.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'servicios', texto: 'Sustituir la LOMLOE por un nuevo marco educativo, garantizar la enseñanza en castellano en toda España y que los padres elijan colegio.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'economia', texto: 'Eliminar el calendario de cierre de las centrales nucleares (Almaraz, Ascó, Vandellós, Cofrentes y Trillo) y tramitar su extensión en los primeros cien días.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'economia', texto: 'Un Pacto Nacional del Agua con hasta 40.000 millones de euros en inversiones hasta 2030.', origen: 'programa', fuente: F.ppPrograma },
    { tema: 'exterior', texto: 'Una ley de programación y financiación de la defensa para cumplir los compromisos con los aliados.', origen: 'programa', fuente: F.ppPrograma },
  ],
  psoe: [
    { tema: 'vivienda', texto: 'Reformar la Constitución para que la vivienda sea un derecho fundamental y dedicar cada año el 1 % del PIB a garantizar el acceso a la vivienda.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'vivienda', texto: 'Consolidar CASA 47, la entidad estatal que gestiona el parque público de vivienda, como actor clave de la vivienda asequible.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'vivienda', texto: 'Un impuesto progresivo a las viviendas de fondos y grandes propietarios que no se destinen al alquiler residencial asequible: las turísticas, las vacías o las alquiladas a precios inasequibles.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'vivienda', texto: 'Mantener la limitación de la compra de viviendas por fondos especulativos y que los municipios que quieran puedan cobrar una tasa por noche en los pisos turísticos.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'impuestos', texto: 'Convertir el mínimo por descendiente del IRPF en un crédito fiscal reembolsable, que llegaría a 2 millones de hogares de ingresos medios y bajos, y seguir sin hacer tributar a las rentas más bajas.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'impuestos', texto: 'Subir los tipos de las rentas del capital por encima de 50.000 €, hasta un máximo del 35 % a partir de 300.000 €, sin tocar los dos primeros tramos.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'impuestos', texto: 'Más impuestos a las grandes tecnológicas y una tasa a los megayates, los jets privados y los billetes en business.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'empleo', texto: 'Completar la reducción de la jornada a 37,5 horas e incentivar que los convenios avancen hacia las 35.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'empleo', texto: 'Blindar por ley un salario mínimo por encima del 60 % del salario medio.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'empleo', texto: 'Un permiso pagado por la Seguridad Social de cuatro semanas al 100 % de la base reguladora para cuidar de hijos menores de ocho años.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'empleo', texto: 'Aprobar el Estatuto del Becario para blindar las prácticas remuneradas.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'pensiones', texto: 'Blindar en la Constitución el sistema público de pensiones y su revalorización con el IPC.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'servicios', texto: 'Acabar con las listas de espera con una financiación pública de la sanidad en torno al 7 % del PIB.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'servicios', texto: 'Plan Sonríe: meter poco a poco en la sanidad pública los tratamientos dentales básicos de los adultos, empezando por empastes, endodoncias y reconstrucciones.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'instituciones', texto: 'Blindar en la Constitución el derecho al aborto y crear en el Código Civil la «unión de amistad» para personas que se comprometen a cuidarse sin ser pareja.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'inmigracion', texto: 'Plan de Integración y Ciudadanía 2026-2030, con 500 millones de euros, y más vías legales y seguras de protección internacional.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'economia', texto: 'Llegar al 81 % de electricidad renovable en 2030 y mantener el cierre de las centrales nucleares hasta 2035.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'exterior', texto: 'Impulsar una defensa común europea coordinando el gasto en defensa, sin aceptar el 5 % del PIB en gasto militar.', origen: 'programa', fuente: F.psoePrograma },
    { tema: 'vivienda', texto: 'Préstamos de hasta 50.000 € para la primera vivienda, con una línea de 10.000 millones.', quien: 'Pedro Sánchez, al presentar los decretos de vivienda', origen: 'gobierno', fuente: F.psoeDecretos },
    { tema: 'vivienda', texto: 'Que los inquilinos se desgraven parte del alquiler y prorrogar dos años los contratos limitando las subidas.', quien: 'Pedro Sánchez, al presentar los decretos de vivienda', origen: 'gobierno', fuente: F.psoeDecretos },
    { tema: 'impuestos', texto: 'Que los pisos turísticos tributen como un negocio y ligar las ventajas fiscales de las socimis al alquiler social.', quien: 'Pedro Sánchez, al presentar los decretos de vivienda', origen: 'gobierno', fuente: F.psoeDecretos },
  ],
  vox: [
    { tema: 'inmigracion', texto: '«Prioridad nacional»: acceso preferente de los españoles a la vivienda pública, guarderías, ayudas y bonos de comedor, y el Ingreso Mínimo Vital solo para españoles.', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'inmigracion', texto: '«Remigración»: repatriar a quien entra ilegalmente, deportar a quien delinque y un plan de retorno para quien vive de ayudas sin contribuir.', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'inmigracion', texto: 'Prohibir las regularizaciones masivas, eliminar el arraigo, endurecer el acceso a la nacionalidad y revisar las concesiones «fraudulentas».', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'inmigracion', texto: 'Militarizar la frontera de Ceuta y Melilla y un plan de inversiones para ambas ciudades.', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'impuestos', texto: 'Bajar el IRPF, el IVA y el Impuesto de Sociedades.', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'impuestos', texto: 'IRPF con mínimo exento de 22.000 €, un 15 % hasta 70.000 € y un 25 % por encima, y cuatro puntos menos por hijo.', origen: 'declaracion', fuente: F.voxDebate },
    { tema: 'empleo', texto: 'Cuota cero para los autónomos que no lleguen al salario mínimo.', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'vivienda', texto: 'Derogar la Ley de Vivienda, reformar la ley del suelo, desalojar al okupa en menos de 24 horas y quitar los impuestos de la compra de la primera vivienda habitual.', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'pensiones', texto: 'Capitalizar un fondo de pensiones público; Abascal niega que quiera privatizar las pensiones.', origen: 'declaracion', fuente: F.voxDebate },
    { tema: 'instituciones', texto: 'Derogar tres leyes por cada una que se apruebe, auditar la Administración y eliminar las subvenciones a sindicatos, partidos y organismos «ideológicos».', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'instituciones', texto: 'Que los jueces elijan a los vocales del CGPJ.', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'servicios', texto: 'Tarjeta sanitaria única, un plan contra las listas de espera, currículo y EVAU únicos en toda España y educación en español garantizada.', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'seguridad', texto: 'Bajar la edad de responsabilidad penal del menor, ampliar la prisión permanente revisable y reconocer a policías y guardias civiles como profesión de riesgo.', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'economia', texto: 'Acabar con las Zonas de Bajas Emisiones, un fondo para el campo frente a las imposiciones de la UE y un plan nacional del agua que conecte todas las cuencas.', origen: 'programa', fuente: F.voxPrograma },
    { tema: 'economia', texto: 'Derogar la normativa del Pacto Verde Europeo y mantener las centrales nucleares.', origen: 'declaracion', fuente: F.voxDebate },
  ],
  erc: [
    { tema: 'instituciones', texto: 'Negociar un referéndum de autodeterminación en Cataluña con acompañamiento internacional.', origen: 'programa', fuente: F.ercPrograma },
    { tema: 'instituciones', texto: 'Una financiación singular para Cataluña, que recaude todos los impuestos generados allí, y el traspaso integral de Rodalies.', origen: 'programa', fuente: F.ercPrograma },
    { tema: 'vivienda', texto: 'Dedicar al menos el 1,5 % del PIB a vivienda para ampliar el parque público de alquiler y traspasar a la Generalitat los inmuebles de la Sareb.', origen: 'programa', fuente: F.ercPrograma },
    { tema: 'vivienda', texto: 'Subir el IVA y el ITP de la compra de vivienda que no sea para vivir en ella y subir el IVA del alquiler turístico.', origen: 'programa', fuente: F.ercPrograma },
    { tema: 'impuestos', texto: 'Subir del 30 % al 35 % el tipo máximo del IRPF sobre las ganancias de capital y bajar el IRPF del trabajo por debajo de 35.000 €.', origen: 'programa', fuente: F.ercPrograma },
    { tema: 'empleo', texto: 'Subir el salario mínimo hasta el 60 % del salario medio y que Cataluña pueda fijar uno propio.', origen: 'programa', fuente: F.ercPrograma },
    { tema: 'empleo', texto: 'Jornada máxima de 37,5 horas semanales sin bajar el sueldo y cuotas reducidas para los autónomos que ingresen menos del salario mínimo.', origen: 'programa', fuente: F.ercPrograma },
    { tema: 'pensiones', texto: 'Blindar la revalorización de las pensiones y que suban según el IPC de cada territorio.', origen: 'programa', fuente: F.ercPrograma },
    { tema: 'exterior', texto: 'Una Unión Europea con defensa autónoma de la OTAN y un embargo completo de armas a Israel.', origen: 'programa', fuente: F.ercPrograma },
  ],
  bng: [
    { tema: 'instituciones', texto: 'Una financiación basada en un concierto económico para Galicia y la AP-9 gallega, pública y sin peajes.', origen: 'programa', fuente: F.bngPrograma },
    { tema: 'vivienda', texto: 'Topar por ley el precio de los alquileres, contratos de alquiler indefinidos y prohibir los desahucios de personas vulnerables sin alternativa.', origen: 'programa', fuente: F.bngPrograma },
    { tema: 'vivienda', texto: 'Traspasar gratis a la Xunta los suelos y viviendas de la Sareb para vivienda pública de alquiler y facilitar la expropiación de vivienda protegida comprada por fondos.', origen: 'programa', fuente: F.bngPrograma },
    { tema: 'empleo', texto: 'Jornada de 35 horas semanales sin bajar el sueldo, con el horizonte de 32 horas en cuatro días, y salario mínimo del 60 % del salario medio.', origen: 'programa', fuente: F.bngPrograma },
    { tema: 'pensiones', texto: 'Derogar las reformas de pensiones de 2011, 2013, 2021 y 2023, subir las mínimas hasta el salario mínimo y revalorizarlas con el IPC real.', origen: 'programa', fuente: F.bngPrograma },
    { tema: 'impuestos', texto: 'Un IRPF más progresivo, con los tramos ajustados al IPC de Galicia.', origen: 'programa', fuente: F.bngPrograma },
    { tema: 'economia', texto: 'Una tarifa eléctrica gallega más barata por ser Galicia excedentaria en electricidad, y control público de los sectores estratégicos.', origen: 'programa', fuente: F.bngPrograma },
    { tema: 'servicios', texto: 'Subir el gasto en sanidad pública al menos a la media por habitante de la UE y acabar con los copagos farmacéuticos.', origen: 'programa', fuente: F.bngPrograma },
    { tema: 'exterior', texto: 'Rechazar el aumento del gasto militar y las directrices de la OTAN.', origen: 'programa', fuente: F.bngPrograma },
  ],
  'coalicion-canaria': [
    { tema: 'instituciones', texto: 'Proteger y actualizar el Régimen Económico y Fiscal (REF) y que no compute como financiación ordinaria de los servicios públicos.', origen: 'programa', fuente: F.ccPrograma },
    { tema: 'instituciones', texto: 'Cumplir la Agenda Canaria y el «Decreto Canarias» y ejecutar los convenios de carreteras, vivienda y agua comprometidos.', origen: 'programa', fuente: F.ccPrograma },
    { tema: 'vivienda', texto: 'Un fondo estatal de ocho años para vivienda pública y asequible, limitar la compra de vivienda por extranjeros y reglas y control para la vivienda vacacional.', origen: 'programa', fuente: F.ccPrograma },
    { tema: 'inmigracion', texto: 'Que los traslados de migrantes a otras comunidades se activen solos al superar unos umbrales, y financiación estatal estable para los menores no acompañados acogidos en Canarias.', origen: 'programa', fuente: F.ccPrograma },
    { tema: 'economia', texto: 'Mantener el descuento del 75 % en el transporte aéreo y marítimo de los residentes y la gratuidad de guaguas y tranvías con financiación estatal.', origen: 'programa', fuente: F.ccPrograma },
    { tema: 'pensiones', texto: 'Que los complementos canarios sean compatibles con las pensiones no contributivas y no cuenten para reducirlas.', origen: 'programa', fuente: F.ccPrograma },
  ],
  'frente-amplio': [
    { tema: 'vivienda', texto: 'Dedicar el 1 % del PIB al año a un parque público de 1,5 millones de viviendas de alquiler asequible en 12 años y blindar el artículo 47 de la Constitución.', origen: 'programa', fuente: F.faPrograma },
    { tema: 'vivienda', texto: 'Topar los alquileres para que no pasen del 25 % de los ingresos del hogar y acabar con los desahucios sin alternativa habitacional.', origen: 'programa', fuente: F.faPrograma },
    { tema: 'vivienda', texto: 'Prohibir que fondos, SOCIMI, inmobiliarias y bancos compren vivienda que no sea para residencia habitual, quitar el régimen fiscal de las SOCIMI y expropiar por fases el parque de los grandes tenedores corporativos.', origen: 'programa', fuente: F.faPrograma },
    { tema: 'empleo', texto: 'Jornada máxima de 32 horas sin bajar el sueldo, empezando ya por las 37,5, y un salario mínimo de al menos el 60 % del salario medio neto por ley.', origen: 'programa', fuente: F.faPrograma },
    { tema: 'pensiones', texto: 'Volver a la jubilación a los 65 años, sin penalización por jubilación anticipada con más de 40 años cotizados, y una pensión mínima igual al salario mínimo.', origen: 'programa', fuente: F.faPrograma },
    { tema: 'impuestos', texto: 'Bajar el IRPF a las rentas del trabajo de hasta 27.000 € y subir los tipos hasta el 52 % a partir de 300.000 €.', origen: 'programa', fuente: F.faPrograma },
    { tema: 'servicios', texto: 'Una prestación universal por crianza de 200 € al mes por menor, gafas y lentillas gratis a cualquier edad («Plan Veo») y audífonos en la sanidad pública.', origen: 'programa', fuente: F.faPrograma },
    { tema: 'economia', texto: 'Cumplir el calendario de cierre nuclear (Almaraz en 2027–2028) y sacar la nuclear y la hidroeléctrica del sistema marginalista de precios de la luz.', origen: 'programa', fuente: F.faPrograma },
    { tema: 'economia', texto: 'Más inversión y más personal en la red ferroviaria.', quien: 'Emilio Delgado', origen: 'declaracion', fuente: F.faTren },
    { tema: 'inmigracion', texto: 'Culminar la regularización extraordinaria de 2026 y procedimientos estables de regularización.', origen: 'programa', fuente: F.faPrograma },
    { tema: 'instituciones', texto: 'Avanzar hacia una república federal y plurinacional.', origen: 'programa', fuente: F.faPrograma },
    { tema: 'exterior', texto: 'Rechazar el objetivo de la OTAN de gastar el 5 % del PIB en defensa y reducir el gasto militar.', origen: 'programa', fuente: F.faPrograma },
  ],
  podemos: [
    { tema: 'vivienda', texto: 'Bajar por ley un 40 % los alquileres, también en los contratos vigentes, y que los contratos de vivienda habitual sean indefinidos.', origen: 'programa', fuente: F.podPrograma },
    { tema: 'vivienda', texto: 'Prohibir comprar vivienda que no sea para vivir en ella y expropiar el uso de las viviendas de grandes tenedores que pasen de diez para alquiler público.', origen: 'programa', fuente: F.podPrograma },
    { tema: 'vivienda', texto: 'Prohibir los desahucios de personas vulnerables sin alternativa habitacional, los desalojos extrajudiciales y las empresas de desokupación.', origen: 'programa', fuente: F.podPrograma },
    { tema: 'empleo', texto: 'Salario mínimo de 1.800 € al mes en una legislatura y jornada de 30 horas semanales sin bajar el sueldo, empezando por 35.', origen: 'programa', fuente: F.podPrograma },
    { tema: 'pensiones', texto: 'Adelantar la jubilación ordinaria a los 63 años y quitar las penalizaciones por jubilación anticipada con 40 años cotizados.', origen: 'programa', fuente: F.podPrograma },
    { tema: 'impuestos', texto: 'Extender el impuesto a las grandes fortunas a todos los que pagan Patrimonio y hacer permanentes los gravámenes a la banca y a las eléctricas.', origen: 'programa', fuente: F.podPrograma },
    { tema: 'economia', texto: 'Una red pública de supermercados, una empresa pública de energía y que el Estado compre la mayoría de Repsol.', origen: 'programa', fuente: F.podPrograma },
    { tema: 'economia', texto: 'Cumplir el calendario de cierre de las centrales nucleares, empezando por Almaraz.', origen: 'programa', fuente: F.podPrograma },
    { tema: 'servicios', texto: 'Residencias y educación de gestión pública directa y derogar la Ley 15/1997 de gestión sanitaria.', origen: 'programa', fuente: F.podPrograma },
    { tema: 'exterior', texto: 'Salir de la OTAN, cerrar las bases de Rota y Morón, revertir el aumento del gasto militar y rechazar el objetivo del 5 % del PIB.', origen: 'programa', fuente: F.podPrograma },
  ],
  'frente-obrero': [
    { tema: 'vivienda', texto: 'Construir vivienda pública, paralizar los desahucios de familias vulnerables hasta tener una alternativa y garantizar la dación en pago.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'vivienda', texto: 'Dar prioridad a los españoles en el acceso a la vivienda pública y actuar contra la okupación, los «inquiokupas» y los narcopisos.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'impuestos', texto: 'Bajar el IRPF a las rentas bajas y subirlo a las altas con más tramos, y subir sociedades y patrimonio a las grandes empresas.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'impuestos', texto: 'Bajar el IVA, pasar los productos de primera necesidad al tipo superreducido y quitar el impuesto de sucesiones a las rentas bajas.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'empleo', texto: 'Subir los salarios en relación con el coste de la vida, prohibir las empresas de trabajo temporal y derogar las reformas laborales que abarataron el despido.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'empleo', texto: 'Quitar la cuota a los autónomos que no llegan al salario mínimo y bajarla al resto.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'pensiones', texto: 'Revertir la subida de la edad de jubilación, subir las pensiones mínimas y no contributivas y calcular la pensión con los mejores años cotizados.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'inmigracion', texto: 'Expulsar a los inmigrantes en situación irregular o que delincan de forma reiterada y retirar la nacionalidad a los nacionalizados que cometan un delito grave.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'inmigracion', texto: 'Dejar de conceder nacionalidades hasta revisar las de los últimos veinte años y endurecer los requisitos de la nacionalidad y del asilo.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'inmigracion', texto: 'Reforzar el control de las fronteras y poner fin al actual modelo migratorio.', origen: 'declaracion', fuente: F.foCircunscripciones },
    { tema: 'instituciones', texto: 'Las mismas competencias y el mismo régimen fiscal para todas las comunidades, centralizar sanidad, educación y emergencias, y fusionar ayuntamientos.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'instituciones', texto: 'Suprimir el Ministerio de Igualdad y las subvenciones «de carácter ideológico».', origen: 'documento', fuente: F.foPrograma },
    { tema: 'instituciones', texto: 'Un proceso constituyente con una nueva Constitución (o, si no, una reforma integral de la actual) y estudiar una circunscripción única para que el reparto sea más proporcional.', quien: 'Roberto Vaquero, en una entrevista', origen: 'declaracion', fuente: F.foEntrevista },
    { tema: 'servicios', texto: 'Una sanidad pública centralizada y sin externalizaciones, con dentista, fisioterapia y oftalmología gratuitos.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'servicios', texto: 'Educación gratuita en todos los niveles (la universitaria, para las rentas bajas), comedor escolar gratuito y sin subvenciones a la escuela privada.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'seguridad', texto: 'Integrar las policías autonómicas en la Policía Nacional, igualar los sueldos con la Guardia Civil y dejar que la Guardia Civil se sindique.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'seguridad', texto: 'Penas más altas por corrupción, también para los partidos, y prohibir el indulto en esos casos.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'economia', texto: 'Nacionalizar los sectores estratégicos, regular el precio de la luz y los combustibles y ampliar el parque nuclear.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'economia', texto: 'Romper con la política agraria de la UE (PAC) y expropiar las tierras sin uso de grandes propietarios para repartirlas entre agricultores y cooperativas.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'exterior', texto: 'Salir de la Unión Europea y de la OTAN y cerrar las bases militares extranjeras, empezando por recuperar Gibraltar.', origen: 'documento', fuente: F.foPrograma },
    { tema: 'exterior', texto: 'Transformar a fondo la Unión Europea y, si esa transformación no llega, «plantearse otras alternativas».', quien: 'Roberto Vaquero, en una entrevista', origen: 'declaracion', fuente: F.foEntrevista },
    { tema: 'exterior', texto: 'Renegociar la relación con la OTAN e invertir en un ejército moderno.', quien: 'Roberto Vaquero, en una entrevista', origen: 'declaracion', fuente: F.foEntrevista },
  ],
  pacma: [
    { tema: 'animales', texto: 'Luchar contra el maltrato y el abandono animal, la tauromaquia, la caza y la explotación de los animales, e impulsar medidas de protección medioambiental.', origen: 'documento', fuente: F.pacma30 },
  ],
  pcte: [
    { tema: 'empleo', texto: 'Defender los derechos laborales y sociales e impulsar la movilización de los trabajadores.', origen: 'declaracion', fuente: F.pcteCantabria },
    { tema: 'economia', texto: 'Una planificación democrática de la economía.', origen: 'declaracion', fuente: F.pcteCantabria },
  ],
  salf: [
    { tema: 'seguridad', texto: 'Una cárcel de máxima seguridad de 3.000 M€, pagada con lo decomisado al narco, sin permisos ni tercer grado para asesinos, agresores sexuales, narcos, terroristas y políticos corruptos, con trabajo obligatorio.', origen: 'programa', fuente: F.salfContrato },
    { tema: 'seguridad', texto: 'Que no prescriban el cohecho, la malversación, la prevaricación, el tráfico de influencias ni la financiación ilegal, y castración química voluntaria como condición para que los agresores sexuales tengan beneficios penitenciarios.', origen: 'programa', fuente: F.salfContrato },
    { tema: 'instituciones', texto: 'Pasar de 22 a 10 ministerios con una sola vicepresidencia, de 1.255 a 400 asesores, y suprimir el Senado.', origen: 'programa', fuente: F.salfContrato },
    { tema: 'instituciones', texto: 'Eliminar la financiación pública de partidos, sindicatos y medios de comunicación.', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'impuestos', texto: 'No pagar IRPF por los primeros 35.000 € de sueldo, eliminar la cuota de autónomos y quitar el IBI a todos.', origen: 'programa', fuente: F.salfContrato },
    { tema: 'vivienda', texto: 'Exenciones fiscales para que la primera vivienda sea un 35 % más barata y desalojar a los okupas en 48 horas con denuncia y título de propiedad.', origen: 'programa', fuente: F.salfContrato },
    { tema: 'vivienda', texto: 'Eliminar trabas a la construcción de vivienda.', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'inmigracion', texto: 'Solo inmigración legal y parar la de los países que no colaboren contra las mafias de trata de personas.', origen: 'programa', fuente: F.salfContrato },
    { tema: 'inmigracion', texto: 'Un plan de deportación masiva de inmigrantes en situación irregular y suprimir ayudas a países como Marruecos.', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'pensiones', texto: 'Reformar el sistema de pensiones (sin detallar cómo).', origen: 'declaracion', fuente: F.salfVistalegre },
    { tema: 'exterior', texto: 'Un referéndum para renegociar con la Unión Europea y, si Bruselas se niega, otro sobre la salida; bloqueo comercial a Marruecos si bloquea un puerto español.', origen: 'programa', fuente: F.salfContrato },
    { tema: 'exterior', texto: 'Una mili voluntaria de seis meses a un año, con 1.600 € netos al mes, para jóvenes de 18 a 30 años.', origen: 'programa', fuente: F.salfContrato },
  ],
};

export const propuestasDe = (slug: string) => PROPUESTAS[slug] ?? [];

/** Fecha (AAAA-MM-DD) de la fuente más reciente de un partido. */
export const ultimaFuente = (slug: string) =>
  propuestasDe(slug).reduce((max, p) => (p.fuente.fecha > max ? p.fuente.fecha : max), '');

/** Fecha de la última revisión de las propuestas (se cambia a mano en cada revisión). */
export const REVISADO = '2026-11-19';
