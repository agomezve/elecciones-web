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
  ccPrograma: { medio: 'Coalición Canaria (programa «Defiende Canarias», en su web)', url: 'https://coalicioncanaria.org/wp-content/uploads/2026/11/CCA-26-Programa_Electoral-29NOV.pdf', fecha: '2026-11-08' },
} satisfies Record<string, Fuente>;

// ─── Propuestas por partido (slug de partidos.ts) ──────────────────────────────
export const PROPUESTAS: Record<string, Propuesta[]> = {
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
    { tema: 'vivienda', texto: 'Crear una Empresa Estatal de Vivienda y llevar el parque público de vivienda por encima del 6 % del total.', origen: 'documento', fuente: F.psoeForbes },
    { tema: 'vivienda', texto: 'Préstamos de hasta 50.000 € para la primera vivienda, con una línea de 10.000 millones.', quien: 'Pedro Sánchez, al presentar los decretos de vivienda', origen: 'gobierno', fuente: F.psoeDecretos },
    { tema: 'vivienda', texto: 'Que los inquilinos se desgraven parte del alquiler y prorrogar dos años los contratos limitando las subidas.', quien: 'Pedro Sánchez, al presentar los decretos de vivienda', origen: 'gobierno', fuente: F.psoeDecretos },
    { tema: 'impuestos', texto: 'Que los pisos turísticos tributen como un negocio y ligar las ventajas fiscales de las socimis al alquiler social.', quien: 'Pedro Sánchez, al presentar los decretos de vivienda', origen: 'gobierno', fuente: F.psoeDecretos },
    { tema: 'empleo', texto: 'Reducir la jornada laboral hasta 36 horas semanales antes de 2030.', origen: 'documento', fuente: F.psoeForbes },
    { tema: 'empleo', texto: 'Que el salario mínimo equivalga al 60 % del salario medio.', origen: 'documento', fuente: F.psoeForbes },
    { tema: 'empleo', texto: 'Aprobar un Estatuto del Becario y que los autónomos coticen por sus ingresos reales.', origen: 'documento', fuente: F.psoeForbes },
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
export const REVISADO = '2026-11-13';
