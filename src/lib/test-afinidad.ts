// Ruta: src/lib/test-afinidad.ts
// Test de afinidad del 29-N: 20 afirmaciones y la postura de cada partido en cada una.
// Regla: ninguna postura se supone. Cada una sale de un voto del partido en el Congreso o de una
// propuesta con fuente de src/lib/propuestas.ts. Si no hay fuente, el partido no tiene postura en
// esa afirmación y no cuenta para su porcentaje.
// Escala: 2 muy a favor, 1 a favor, 0 se abstuvo o neutral, -1 en contra, -2 muy en contra.
import { F, type Fuente } from './propuestas';

export interface Postura {
  v: -2 | -1 | 0 | 1 | 2;
  /** Qué hizo o dijo el partido, en una frase y sin valorar. */
  por: string;
  fuente: Fuente;
}

export interface Afirmacion {
  id: string;
  tema: string;
  texto: string;
  posturas: Record<string, Postura>;
}

// ─── Votaciones en el Congreso (XV legislatura) ────────────────────────────────
const V = {
  amnistia: { medio: 'Deia (votación del Congreso)', url: 'https://www.deia.eus/politica/2024/05/30/congreso-aprueba-forma-definitiva-ley-8297867.html', fecha: '2024-05-30' },
  jornada: { medio: 'Periódico de Ibiza (votación del Congreso)', url: 'https://www.periodicodeibiza.es/noticias/nacional/2025/09/11/2467647/congreso-tumba-reduccion-jornada-laboral-prosperar-veto-vox-junts.html', fecha: '2025-09-10' },
  nucleares: { medio: 'The Objective (votación del Congreso)', url: 'https://theobjective.com/espana/politica/2025-02-12/congreso-prolongar-erc-junts/', fecha: '2025-02-12' },
} satisfies Record<string, Fuente>;

const SUMAR = 'el grupo Sumar, del que salen los partidos de Frente Amplio,';

const amnistiaSi = (quien: string): Postura => ({ v: 2, por: `${quien} votó a favor de la ley de amnistía (30-may-2024).`, fuente: V.amnistia });
const amnistiaNo = (quien: string): Postura => ({ v: -2, por: `${quien} votó en contra de la ley de amnistía (30-may-2024).`, fuente: V.amnistia });
const jornadaNo = (quien: string): Postura => ({ v: -2, por: `${quien} votó a favor de devolver al Gobierno la ley de las 37,5 horas, que decayó (10-sep-2025).`, fuente: V.jornada });
const jornadaSi = (quien: string, v: 1 | 2 = 1): Postura => ({ v, por: `${quien} votó en contra de devolver la ley de las 37,5 horas al Gobierno (10-sep-2025).`, fuente: V.jornada });

export const AFIRMACIONES: Afirmacion[] = [
  {
    id: 'amnistia', tema: 'Cataluña e instituciones',
    texto: 'La ley de amnistía para los encausados por el procés fue una buena decisión.',
    posturas: {
      psoe: amnistiaSi('El PSOE'), 'frente-amplio': amnistiaSi(`En el Congreso, ${SUMAR}`), erc: amnistiaSi('ERC'), junts: amnistiaSi('Junts'),
      'eh-bildu': amnistiaSi('EH Bildu'), pnv: amnistiaSi('El PNV'), podemos: amnistiaSi('Podemos'), bng: amnistiaSi('El BNG'),
      pp: amnistiaNo('El PP'), vox: amnistiaNo('VOX'), 'coalicion-canaria': amnistiaNo('Coalición Canaria'), 'upn-pp': amnistiaNo('UPN'),
    },
  },
  {
    id: 'jornada', tema: 'Empleo',
    texto: 'Hay que reducir por ley la jornada laboral máxima por debajo de las 40 horas semanales.',
    posturas: {
      psoe: { v: 2, por: 'Propone reducir la jornada hasta 36 horas semanales antes de 2030.', fuente: F.psoeForbes },
      'frente-amplio': { v: 2, por: 'Emilio Delgado propone reducir la jornada laboral.', fuente: F.faActo },
      podemos: { v: 2, por: 'Propone una jornada laboral de 30 horas semanales.', fuente: F.podWeb },
      erc: jornadaSi('ERC'), 'eh-bildu': jornadaSi('EH Bildu'), pnv: jornadaSi('El PNV'), bng: jornadaSi('El BNG'), 'coalicion-canaria': jornadaSi('Coalición Canaria'),
      pp: jornadaNo('El PP'), vox: jornadaNo('VOX'), junts: jornadaNo('Junts'), 'upn-pp': jornadaNo('UPN'),
    },
  },
  {
    id: 'nucleares', tema: 'Energía',
    texto: 'Hay que alargar la vida de las centrales nucleares más allá del calendario de cierre.',
    posturas: {
      'frente-obrero': { v: 2, por: 'Su programa propone frenar el cierre de centrales y ampliar el parque nuclear.', fuente: F.foPrograma },
      pp: { v: 2, por: 'Presentó y votó a favor de pedir que se amplíe la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
      vox: { v: 2, por: 'Propone mantener las centrales nucleares.', fuente: F.voxDebate },
      'upn-pp': { v: 2, por: 'UPN votó a favor de pedir que se amplíe la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
      erc: { v: 0, por: 'Se abstuvo en la votación para ampliar la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
      junts: { v: 0, por: 'Se abstuvo en la votación para ampliar la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
      psoe: { v: -2, por: 'Votó en contra de pedir que se amplíe la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
      'frente-amplio': { v: -2, por: `En el Congreso, ${SUMAR} votó en contra de ampliar la vida útil de las centrales (12-feb-2025).`, fuente: V.nucleares },
      pnv: { v: -2, por: 'Votó en contra de pedir que se amplíe la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
    },
  },
  {
    id: 'bajar-impuestos', tema: 'Impuestos',
    texto: 'Hay que bajar los impuestos en general, aunque el Estado ingrese menos.',
    posturas: {
      pp: { v: 2, por: 'Propone revisar las subidas de impuestos de los últimos años y bajar la presión fiscal.', fuente: F.ppContrato },
      vox: { v: 2, por: 'Propone bajar el IRPF (15 % hasta 70.000 €) y el IVA general al 18 %.', fuente: F.voxDebate },
      salf: { v: 2, por: 'Propone un IRPF del 0 % para quien gane menos de 35.000 € al año.', fuente: F.salfVistalegre },
      'frente-amplio': { v: -1, por: 'Ernest Urtasun propone subir los impuestos a las eléctricas.', fuente: F.faActo },
    },
  },
  {
    id: 'precio-alquiler', tema: 'Vivienda',
    texto: 'El Estado debe limitar el precio de los alquileres.',
    posturas: {
      'frente-amplio': { v: 2, por: 'Propone controlar los precios del alquiler.', fuente: F.faActo },
      podemos: { v: 2, por: 'Propone bajar los alquileres un 40 %.', fuente: F.podEP },
      psoe: { v: 1, por: 'Propone prorrogar dos años los contratos limitando las subidas.', fuente: F.psoeDecretos },
    },
  },
  {
    id: 'suelo', tema: 'Vivienda',
    texto: 'Para que la vivienda baje, lo principal es construir más liberando suelo y quitando trámites.',
    posturas: {
      pp: { v: 2, por: 'Propone construir un millón de viviendas con menos trámites para liberar suelo.', fuente: F.ppContrato },
      vox: { v: 2, por: 'Propone liberalizar el suelo salvo zonas protegidas.', fuente: F.voxDemocrata },
      salf: { v: 2, por: 'Propone eliminar trabas a la construcción de vivienda.', fuente: F.salfVistalegre },
    },
  },
  {
    id: 'vivienda-publica', tema: 'Vivienda',
    texto: 'El Estado debe construir y gestionar mucha más vivienda pública.',
    posturas: {
      'frente-obrero': { v: 1, por: 'Su programa propone construir vivienda pública de calidad.', fuente: F.foPrograma },
      psoe: { v: 2, por: 'Propone una Empresa Estatal de Vivienda y un parque público por encima del 6 %.', fuente: F.psoeForbes },
      podemos: { v: 2, por: 'Propone expropiar viviendas de fondos para alquilarlas como vivienda social.', fuente: F.podEP },
      'frente-amplio': { v: 1, por: 'Propone intervenir el mercado de la vivienda.', fuente: F.faActo },
    },
  },
  {
    id: 'expropiar-fondos', tema: 'Vivienda',
    texto: 'Hay que expropiar las viviendas de los grandes fondos de inversión para hacerlas vivienda social.',
    posturas: {
      podemos: { v: 2, por: 'Propone expropiar las viviendas de los «fondos buitre».', fuente: F.podEP },
      'frente-amplio': { v: 1, por: 'Su texto conjunto propone plantar cara a los fondos buitre.', fuente: F.faPublico },
    },
  },
  {
    id: 'okupas', tema: 'Vivienda',
    texto: 'Hay que desalojar a los okupas en un plazo de horas, sin esperar a un juicio largo.',
    posturas: {
      'frente-obrero': { v: 1, por: 'Su programa dice que la okupación de viviendas de particulares no debe permitirse en ningún caso.', fuente: F.foPrograma },
      pp: { v: 2, por: 'Propone desalojar a los okupas en 48 horas.', fuente: F.ppContrato2 },
      vox: { v: 2, por: 'Propone endurecer la respuesta a la okupación.', fuente: F.voxDemocrata },
    },
  },
  {
    id: 'smi', tema: 'Empleo',
    texto: 'El salario mínimo debe seguir subiendo.',
    posturas: {
      psoe: { v: 2, por: 'Propone que el salario mínimo equivalga al 60 % del salario medio.', fuente: F.psoeForbes },
      'frente-amplio': { v: 2, por: 'Ernest Urtasun propone seguir subiendo el salario mínimo.', fuente: F.faActo },
      podemos: { v: 2, por: 'Propone un salario mínimo de 1.800 € por ley.', fuente: F.podWeb },
    },
  },
  {
    id: 'autonomos', tema: 'Empleo',
    texto: 'Los autónomos que ganan poco deberían pagar mucha menos cuota, o ninguna.',
    posturas: {
      'frente-obrero': { v: 2, por: 'Su programa propone quitar la cuota a los autónomos que no llegan al salario mínimo.', fuente: F.foPrograma },
      vox: { v: 2, por: 'Propone quitar la cuota a quien ingrese menos que el salario mínimo.', fuente: F.voxDebate },
      psoe: { v: 1, por: 'Propone que los autónomos coticen por sus ingresos reales.', fuente: F.psoeForbes },
    },
  },
  {
    id: 'pensiones-ipc', tema: 'Pensiones',
    texto: 'Las pensiones deben subir cada año al menos lo que suban los precios (IPC).',
    posturas: {
      pp: { v: 2, por: 'Propone revalorizar las pensiones con el IPC dentro del Pacto de Toledo.', fuente: F.ppContrato },
    },
  },
  {
    id: 'deportaciones', tema: 'Inmigración',
    texto: 'Hay que expulsar de España a los inmigrantes que están en situación irregular.',
    posturas: {
      'frente-obrero': { v: 2, por: 'Su programa propone expulsar a los inmigrantes en situación irregular.', fuente: F.foPrograma },
      vox: { v: 2, por: 'Propone repatriar a quien entra ilegalmente («remigración»).', fuente: F.voxDebate },
      salf: { v: 2, por: 'Propone un plan de deportación masiva de inmigrantes en situación irregular.', fuente: F.salfVistalegre },
      pp: { v: 1, por: 'Propone reducir la inmigración irregular y no hacer regularizaciones colectivas.', fuente: F.ppContrato },
    },
  },
  {
    id: 'prioridad-nacional', tema: 'Inmigración',
    texto: 'Las ayudas sociales y del alquiler deben darse primero a los españoles.',
    posturas: {
      'frente-obrero': { v: 2, por: 'Su programa propone dar prioridad a los españoles en la vivienda pública y en las ayudas.', fuente: F.foPrograma },
      vox: { v: 2, por: 'Propone la «prioridad nacional» en ayudas sociales, al alquiler y guarderías.', fuente: F.voxDebate },
    },
  },
  {
    id: 'gasto-politico', tema: 'Instituciones',
    texto: 'Hay que recortar el gasto político: menos altos cargos y nada de subvenciones a partidos y sindicatos.',
    posturas: {
      'frente-obrero': { v: 1, por: 'Su programa propone suprimir cargos duplicados y las subvenciones «de carácter ideológico».', fuente: F.foPrograma },
      pp: { v: 1, por: 'Propone menos ministerios, altos cargos y asesores, y auditar el gasto.', fuente: F.ppContrato },
      vox: { v: 2, por: 'Propone acabar con las subvenciones a partidos, sindicatos y patronales.', fuente: F.voxDebate },
      salf: { v: 2, por: 'Propone eliminar la financiación pública de partidos, sindicatos y medios.', fuente: F.salfVistalegre },
    },
  },
  {
    id: 'carceles', tema: 'Seguridad',
    texto: 'Las cárceles deben ser mucho más duras, con trabajo obligatorio para reducir la condena.',
    posturas: {
      salf: { v: 2, por: 'Propone cárceles de máxima seguridad «al estilo de El Salvador» con trabajo obligatorio.', fuente: F.salfVistalegre },
    },
  },
  {
    id: 'empresas-publicas', tema: 'Economía',
    texto: 'Las grandes empresas de energía y alimentación deberían pasar a ser públicas.',
    posturas: {
      'frente-obrero': { v: 2, por: 'Su programa propone nacionalizar los sectores estratégicos de la economía.', fuente: F.foPrograma },
      podemos: { v: 2, por: 'Propone expropiar empresas estratégicas como las de energía y alimentación.', fuente: F.podEP },
    },
  },
  {
    id: 'pacto-verde', tema: 'Energía',
    texto: 'España debería dejar de aplicar las normas del Pacto Verde Europeo.',
    posturas: {
      'frente-obrero': { v: 2, por: 'Su programa propone poner fin a la «transición ecológica» que marca la UE.', fuente: F.foPrograma },
      vox: { v: 2, por: 'Propone derogar la normativa del Pacto Verde Europeo.', fuente: F.voxDebate },
    },
  },
  {
    id: 'defensa', tema: 'Europa y defensa',
    texto: 'España no debe gastar más dinero en armamento.',
    posturas: {
      'frente-obrero': { v: -1, por: 'Su programa propone salir de la OTAN y reforzar el ejército.', fuente: F.foPrograma },
      podemos: { v: 2, por: 'Propone no destinar «ni un euro más» a armamento.', fuente: F.podWeb },
    },
  },
  {
    id: 'referendum-ue', tema: 'Europa y defensa',
    texto: 'Los españoles deberían votar en un referéndum si España sigue en la Unión Europea.',
    posturas: {
      salf: { v: 2, por: 'Propone un referéndum sobre la permanencia de España en la UE.', fuente: F.salfVistalegre },
    },
  },
];

/** Por debajo de este número de afirmaciones comparables, el partido sale aparte, como poco fiable. */
export const MINIMO_FIABLE = 6;
