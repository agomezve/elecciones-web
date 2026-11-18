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
      psoe: { v: 2, por: 'Su programa propone completar la reducción de la jornada a 37,5 horas y avanzar hacia las 35.', fuente: F.psoePrograma },
      'frente-amplio': { v: 2, por: 'Su programa propone una jornada máxima de 32 horas sin bajar el sueldo, empezando por las 37,5.', fuente: F.faPrograma },
      podemos: { v: 2, por: 'Su programa propone una jornada de 30 horas semanales, empezando por 35.', fuente: F.podPrograma },
      erc: jornadaSi('ERC'), 'eh-bildu': jornadaSi('EH Bildu'), pnv: jornadaSi('El PNV'), bng: jornadaSi('El BNG'), 'coalicion-canaria': jornadaSi('Coalición Canaria'),
      pp: jornadaNo('El PP'), vox: jornadaNo('VOX'), junts: jornadaNo('Junts'), 'upn-pp': jornadaNo('UPN'),
    },
  },
  {
    id: 'nucleares', tema: 'Energía',
    texto: 'Hay que alargar la vida de las centrales nucleares más allá del calendario de cierre.',
    posturas: {
      'frente-obrero': { v: 2, por: 'Su programa propone frenar el cierre de centrales y ampliar el parque nuclear.', fuente: F.foPrograma },
      pp: { v: 2, por: 'Su programa propone eliminar el calendario de cierre de las centrales nucleares.', fuente: F.ppPrograma },
      vox: { v: 2, por: 'Propone mantener las centrales nucleares.', fuente: F.voxDebate },
      'upn-pp': { v: 2, por: 'UPN votó a favor de pedir que se amplíe la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
      erc: { v: 0, por: 'Se abstuvo en la votación para ampliar la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
      junts: { v: 0, por: 'Se abstuvo en la votación para ampliar la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
      psoe: { v: -2, por: 'Votó en contra de pedir que se amplíe la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
      'frente-amplio': { v: -2, por: 'Su programa propone cumplir el calendario de cierre nuclear (Almaraz en 2027–2028).', fuente: F.faPrograma },
      pnv: { v: -2, por: 'Votó en contra de pedir que se amplíe la vida útil de las centrales (12-feb-2025).', fuente: V.nucleares },
      'eh-bildu': { v: -2, por: 'Su programa propone mantener el calendario de cierre nuclear.', fuente: F.bilduPrograma },
      podemos: { v: -2, por: 'Su programa propone cumplir el calendario de cierre de las centrales, empezando por Almaraz.', fuente: F.podPrograma },
    },
  },
  {
    id: 'bajar-impuestos', tema: 'Impuestos',
    texto: 'Hay que bajar los impuestos en general, aunque el Estado ingrese menos.',
    posturas: {
      erc: { v: -1, por: 'Su programa propone subir el IRPF de las ganancias de capital y bajarlo a las rentas del trabajo de menos de 35.000 €.', fuente: F.ercPrograma },
      pp: { v: 2, por: 'Su programa propone bajar el IRPF a rentas medias y bajas y un IVA del 0 % en alimentos básicos.', fuente: F.ppPrograma },
      vox: { v: 2, por: 'Su programa propone bajar el IRPF, el IVA y el Impuesto de Sociedades.', fuente: F.voxPrograma },
      salf: { v: 2, por: 'Su contrato electoral propone no pagar IRPF por los primeros 35.000 € y eliminar el IBI y la cuota de autónomos.', fuente: F.salfContrato },
      'frente-amplio': { v: -1, por: 'Su programa propone bajar el IRPF a las rentas del trabajo de hasta 27.000 € y subirlo hasta el 52 % desde 300.000 €.', fuente: F.faPrograma },
      psoe: { v: -1, por: 'Su programa propone subir los impuestos a las rentas del capital altas y a las grandes tecnológicas, y no hacer tributar a las rentas más bajas.', fuente: F.psoePrograma },
      'eh-bildu': { v: -1, por: 'Su programa propone subir el impuesto a la banca y a las grandes fortunas y crear uno a las grandes distribuidoras de alimentación.', fuente: F.bilduPrograma },
      podemos: { v: -1, por: 'Su programa propone extender el impuesto a las grandes fortunas y hacer permanentes los gravámenes a la banca y las eléctricas.', fuente: F.podPrograma },
      junts: { v: 1, por: 'Su programa propone bajar los impuestos de la vivienda a inquilinos, compradores y propietarios que alquilen.', fuente: F.juntsPrograma },
    },
  },
  {
    id: 'precio-alquiler', tema: 'Vivienda',
    texto: 'El Estado debe limitar el precio de los alquileres.',
    posturas: {
      bng: { v: 2, por: 'Su programa propone topar por ley el precio de los alquileres.', fuente: F.bngPrograma },
      pp: { v: -2, por: 'Su programa propone derogar la Ley de Vivienda y eliminar las zonas tensionadas y el índice de precios.', fuente: F.ppPrograma },
      vox: { v: -1, por: 'Su programa propone derogar la Ley de Vivienda.', fuente: F.voxPrograma },
      'frente-amplio': { v: 2, por: 'Su programa propone topar los alquileres para que no pasen del 25 % de los ingresos del hogar.', fuente: F.faPrograma },
      podemos: { v: 2, por: 'Su programa propone bajar por ley un 40 % los alquileres.', fuente: F.podPrograma },
      psoe: { v: 1, por: 'Propone prorrogar dos años los contratos limitando las subidas.', fuente: F.psoeDecretos },
      'eh-bildu': { v: 2, por: 'Su programa propone una subida máxima del alquiler del 2 % al año.', fuente: F.bilduPrograma },
    },
  },
  {
    id: 'suelo', tema: 'Vivienda',
    texto: 'Para que la vivienda baje, lo principal es construir más liberando suelo y quitando trámites.',
    posturas: {
      pp: { v: 2, por: 'Su programa propone un millón de viviendas, una nueva Ley del Suelo y licencias en tres meses.', fuente: F.ppPrograma },
      vox: { v: 2, por: 'Su programa propone reformar la ley del suelo y construir más vivienda nueva.', fuente: F.voxPrograma },
      salf: { v: 2, por: 'Propone eliminar trabas a la construcción de vivienda.', fuente: F.salfVistalegre },
    },
  },
  {
    id: 'vivienda-publica', tema: 'Vivienda',
    texto: 'El Estado debe construir y gestionar mucha más vivienda pública.',
    posturas: {
      erc: { v: 2, por: 'Su programa propone dedicar el 1,5 % del PIB a vivienda para ampliar el parque público de alquiler.', fuente: F.ercPrograma },
      bng: { v: 2, por: 'Su programa propone traspasar la Sareb a la Xunta para vivienda pública de alquiler y crear empresas públicas de vivienda.', fuente: F.bngPrograma },
      'coalicion-canaria': { v: 1, por: 'Su programa propone un fondo estatal de ocho años para vivienda pública y asequible.', fuente: F.ccPrograma },
      'frente-obrero': { v: 1, por: 'Su programa propone construir vivienda pública de calidad.', fuente: F.foPrograma },
      psoe: { v: 2, por: 'Su programa propone dedicar cada año el 1 % del PIB a vivienda y consolidar CASA 47, la entidad estatal de vivienda pública.', fuente: F.psoePrograma },
      podemos: { v: 2, por: 'Su programa propone pasar al parque público las viviendas de la Sareb y expropiar el uso de las de grandes tenedores.', fuente: F.podPrograma },
      'frente-amplio': { v: 2, por: 'Su programa propone dedicar el 1 % del PIB al año a 1,5 millones de viviendas públicas de alquiler.', fuente: F.faPrograma },
      junts: { v: 1, por: 'Su programa pide traspasar a la Generalitat la vivienda y el suelo de la Sareb y Casa 47 en Cataluña y un gasto en vivienda como la media europea.', fuente: F.juntsPrograma },
    },
  },
  {
    id: 'expropiar-fondos', tema: 'Vivienda',
    texto: 'Hay que expropiar las viviendas de los grandes fondos de inversión para hacerlas vivienda social.',
    posturas: {
      bng: { v: 1, por: 'Su programa propone facilitar la expropiación de vivienda de promoción pública comprada por fondos.', fuente: F.bngPrograma },
      podemos: { v: 2, por: 'Su programa propone expropiar el uso de las viviendas de grandes tenedores que pasen de diez.', fuente: F.podPrograma },
      'frente-amplio': { v: 2, por: 'Su programa propone una ley para expropiar por fases las viviendas de los grandes tenedores corporativos.', fuente: F.faPrograma },
    },
  },
  {
    id: 'okupas', tema: 'Vivienda',
    texto: 'Hay que desalojar a los okupas en un plazo de horas, sin esperar a un juicio largo.',
    posturas: {
      'frente-obrero': { v: 1, por: 'Su programa dice que la okupación de viviendas de particulares no debe permitirse en ningún caso.', fuente: F.foPrograma },
      pp: { v: 2, por: 'Su programa propone que el propietario recupere su vivienda en 48 horas por orden judicial.', fuente: F.ppPrograma },
      vox: { v: 2, por: 'Su programa propone desalojar al okupa en menos de 24 horas.', fuente: F.voxPrograma },
      junts: { v: 2, por: 'Su programa propone desalojar las ocupaciones ilegales en 48 horas con un juicio inmediato.', fuente: F.juntsPrograma },
      salf: { v: 2, por: 'Su contrato electoral propone desalojar a los okupas en 48 horas con denuncia y título de propiedad.', fuente: F.salfContrato },
    },
  },
  {
    id: 'smi', tema: 'Empleo',
    texto: 'El salario mínimo debe seguir subiendo.',
    posturas: {
      erc: { v: 2, por: 'Su programa propone subir el salario mínimo hasta el 60 % del salario medio.', fuente: F.ercPrograma },
      bng: { v: 2, por: 'Su programa propone subir el salario mínimo hasta el 60 % del salario medio.', fuente: F.bngPrograma },
      psoe: { v: 2, por: 'Su programa propone blindar por ley un salario mínimo por encima del 60 % del salario medio.', fuente: F.psoePrograma },
      pnv: { v: 1, por: 'Su programa pide que Euskadi pueda fijar un salario mínimo propio, superior al estatal.', fuente: F.pnvPrograma },
      'frente-amplio': { v: 2, por: 'Su programa propone un salario mínimo de al menos el 60 % del salario medio neto.', fuente: F.faPrograma },
      podemos: { v: 2, por: 'Su programa propone un salario mínimo de 1.800 € al mes en una legislatura.', fuente: F.podPrograma },
      'eh-bildu': { v: 1, por: 'Su programa propone que las comunidades puedan fijar un salario mínimo propio por encima del estatal.', fuente: F.bilduPrograma },
    },
  },
  {
    id: 'autonomos', tema: 'Empleo',
    texto: 'Los autónomos que ganan poco deberían pagar mucha menos cuota, o ninguna.',
    posturas: {
      pp: { v: 2, por: 'Su programa propone que los nuevos autónomos no paguen cuota el primer año, ni el segundo si no llegan al salario mínimo.', fuente: F.ppPrograma },
      erc: { v: 1, por: 'Su programa propone cuotas reducidas para los autónomos que ingresen menos del salario mínimo.', fuente: F.ercPrograma },
      'frente-obrero': { v: 2, por: 'Su programa propone quitar la cuota a los autónomos que no llegan al salario mínimo.', fuente: F.foPrograma },
      vox: { v: 2, por: 'Su programa propone cuota cero para los autónomos que no lleguen al salario mínimo.', fuente: F.voxPrograma },
      psoe: { v: 1, por: 'Propone que los autónomos coticen por sus ingresos reales.', fuente: F.psoeForbes },
      salf: { v: 2, por: 'Su contrato electoral propone eliminar la cuota de autónomos.', fuente: F.salfContrato },
    },
  },
  {
    id: 'pensiones-ipc', tema: 'Pensiones',
    texto: 'Las pensiones deben subir cada año al menos lo que suban los precios (IPC).',
    posturas: {
      erc: { v: 2, por: 'Su programa propone blindar la revalorización de las pensiones.', fuente: F.ercPrograma },
      bng: { v: 2, por: 'Su programa propone revalorizar las pensiones con el IPC real.', fuente: F.bngPrograma },
      pp: { v: 2, por: 'Su programa propone que las pensiones suban cada año con el IPC.', fuente: F.ppPrograma },
      psoe: { v: 2, por: 'Su programa propone blindar en la Constitución la revalorización de las pensiones con el IPC.', fuente: F.psoePrograma },
      pnv: { v: 2, por: 'Su programa propone mantener la revalorización de las pensiones conforme al IPC.', fuente: F.pnvPrograma },
      'eh-bildu': { v: 2, por: 'Su programa propone blindar la revalorización anual de las pensiones con el IPC.', fuente: F.bilduPrograma },
      'frente-amplio': { v: 2, por: 'Su programa propone blindar en la Constitución la revalorización de las pensiones.', fuente: F.faPrograma },
    },
  },
  {
    id: 'deportaciones', tema: 'Inmigración',
    texto: 'Hay que expulsar de España a los inmigrantes que están en situación irregular.',
    posturas: {
      'frente-obrero': { v: 2, por: 'Su programa propone expulsar a los inmigrantes en situación irregular.', fuente: F.foPrograma },
      vox: { v: 2, por: 'Su programa propone repatriar a quien entra ilegalmente («remigración»).', fuente: F.voxPrograma },
      salf: { v: 2, por: 'Propone un plan de deportación masiva de inmigrantes en situación irregular.', fuente: F.salfVistalegre },
      pp: { v: 1, por: 'Su programa propone devolver sin demora a quien entre de forma irregular y prohibir las regularizaciones masivas.', fuente: F.ppPrograma },
    },
  },
  {
    id: 'prioridad-nacional', tema: 'Inmigración',
    texto: 'Las ayudas sociales y del alquiler deben darse primero a los españoles.',
    posturas: {
      'frente-obrero': { v: 2, por: 'Su programa propone dar prioridad a los españoles en la vivienda pública y en las ayudas.', fuente: F.foPrograma },
      vox: { v: 2, por: 'Su programa propone la «prioridad nacional» en vivienda pública, guarderías y ayudas.', fuente: F.voxPrograma },
    },
  },
  {
    id: 'gasto-politico', tema: 'Instituciones',
    texto: 'Hay que recortar el gasto político: menos altos cargos y nada de subvenciones a partidos y sindicatos.',
    posturas: {
      'frente-obrero': { v: 1, por: 'Su programa propone suprimir cargos duplicados y las subvenciones «de carácter ideológico».', fuente: F.foPrograma },
      pp: { v: 1, por: 'Su programa propone menos ministerios, altos cargos y asesores.', fuente: F.ppPrograma },
      vox: { v: 2, por: 'Su programa propone eliminar las subvenciones a sindicatos, partidos y organismos «ideológicos».', fuente: F.voxPrograma },
      salf: { v: 2, por: 'Propone eliminar la financiación pública de partidos, sindicatos y medios.', fuente: F.salfVistalegre },
    },
  },
  {
    id: 'carceles', tema: 'Seguridad',
    texto: 'Las cárceles deben ser mucho más duras, con trabajo obligatorio para reducir la condena.',
    posturas: {
      salf: { v: 2, por: 'Su contrato electoral propone una cárcel de máxima seguridad sin permisos ni tercer grado y con trabajo obligatorio.', fuente: F.salfContrato },
    },
  },
  {
    id: 'empresas-publicas', tema: 'Economía',
    texto: 'Las grandes empresas de energía y alimentación deberían pasar a ser públicas.',
    posturas: {
      bng: { v: 1, por: 'Su programa propone el control público de los sectores estratégicos, sobre todo de la energía.', fuente: F.bngPrograma },
      'frente-obrero': { v: 2, por: 'Su programa propone nacionalizar los sectores estratégicos de la economía.', fuente: F.foPrograma },
      podemos: { v: 2, por: 'Su programa propone una red pública de supermercados, una empresa pública de energía y que el Estado compre la mayoría de Repsol.', fuente: F.podPrograma },
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
      bng: { v: 2, por: 'Su programa rechaza el aumento del gasto militar.', fuente: F.bngPrograma },
      pp: { v: -1, por: 'Su programa propone una ley de financiación de la defensa para cumplir los compromisos con los aliados.', fuente: F.ppPrograma },
      'frente-obrero': { v: -1, por: 'Su programa propone salir de la OTAN y reforzar el ejército.', fuente: F.foPrograma },
      podemos: { v: 2, por: 'Su programa propone revertir el aumento del gasto militar y salir de la OTAN.', fuente: F.podPrograma },
      'eh-bildu': { v: 2, por: 'Su programa rechaza el aumento del gasto en defensa que pide la OTAN.', fuente: F.bilduPrograma },
      'frente-amplio': { v: 2, por: 'Su programa rechaza el objetivo del 5 % del PIB y propone reducir el gasto militar.', fuente: F.faPrograma },
    },
  },
  {
    id: 'referendum-ue', tema: 'Europa y defensa',
    texto: 'Los españoles deberían votar en un referéndum si España sigue en la Unión Europea.',
    posturas: {
      salf: { v: 2, por: 'Su contrato electoral propone un referéndum para renegociar con la UE y, si Bruselas se niega, otro sobre la salida.', fuente: F.salfContrato },
    },
  },
];

/** Por debajo de este número de afirmaciones comparables, el partido sale aparte, como poco fiable. */
export const MINIMO_FIABLE = 6;
