// Ruta: src/config/site.ts
// Fuente única de datos del sitio: nombre, navegación, enlaces legales y datos del titular.
// Cualquier cambio de marca o de ruta se hace aquí.

// Dominio y ruta base: se configuran solo en astro.config.mjs (`site` y `base`).
const SITE_ORIGIN = (import.meta.env.SITE ?? 'https://elecciones.iaencrudo.es').replace(/\/+$/, '');
/** Ruta base sin barra final: '' en un dominio propio, '/elecciones-web' en GitHub Pages. */
export const BASE_PATH = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');

export const SITE = {
  name: 'Elecciones al Día',
  /** URL pública del sitio, incluida la ruta base (sin barra final). */
  url: `${SITE_ORIGIN}${BASE_PATH}`,
  locale: 'es_ES',
  lang: 'es',
  tagline: 'Elecciones generales del 29-N: plazos, candidatos y herramientas, con datos oficiales',
  /** <title> de la portada (60 caracteres como máximo). */
  homeTitle: 'Elecciones generales 29 de noviembre de 2026: guía y datos',
  description:
    'Todo para votar el 29-N: voto por correo, candidatos de tu provincia según el BOE, partidos, calculadora de pactos, simulador D\'Hondt y cuánto vale tu voto',
  year: 2026,
  /**
   * Código de verificación de Google Search Console (método "Etiqueta HTML").
   * Pega solo el valor de content="…". Vacío: no se añade la etiqueta.
   */
  googleSiteVerification: '',
  bingSiteVerification: '',
} as const;

/**
 * Datos del titular del sitio (LSSI-CE art. 10). Se muestran en el aviso legal,
 * la política de privacidad y la página de contacto.
 * Si alguno queda vacío, las páginas muestran un aviso "[Pendiente: …]" visible.
 */
export const OWNER = {
  name: 'Aarón Gómez Vera',
  email: 'contacto@iaencrudo.es',
} as const;

/**
 * Formulario de contacto. Sin `formEndpoint`, el formulario abre el programa de correo
 * del usuario con el mensaje ya redactado (no se envían datos a terceros).
 */
export const CONTACT = {
  formEndpoint: '',
} as const;

/** Fecha de la última revisión de los textos legales. */
export const LEGAL_UPDATED = '23 de octubre de 2026';

/**
 * Google AdSense. Mismo editor que el resto de webs; cada dominio nuevo hay que añadirlo
 * en AdSense > Sitios y esperar la aprobación. Los bloques solo aparecen cuando tienen id.
 */
export const ADSENSE = {
  clientId: 'ca-pub-3004394150242621',
  slots: {
    horizontal: '',
    rectangle: '',
    'in-article': '',
  },
} as const;

export type AdFormat = keyof typeof ADSENSE.slots;

/** true si hay un client id de AdSense con formato válido ("ca-pub-" + 16 dígitos). */
export function isAdSenseEnabled(): boolean {
  return /^ca-pub-\d{16}$/.test(ADSENSE.clientId.trim());
}

/** Canal de YouTube donde enseño cómo construyo estas webs con IA. */
export const CHANNEL = {
  name: 'IA en Crudo',
  url: 'https://www.youtube.com/@iaencrudo',
} as const;

/** Autor real de la web: bloque de autor de las páginas de ciudad y provincia y JSON-LD (Person). */
export const AUTHOR = {
  name: OWNER.name,
  href: '/sobre-mi',
  jobTitle: 'Programador backend',
  initials: 'AG',
  /** Perfiles del autor en otras webs (schema.org sameAs). */
  sameAs: [CHANNEL.url],
  bio: `Soy ${OWNER.name}, programador backend. He construido ${SITE.name} con ayuda de IA y lo cuento en mi canal ${CHANNEL.name}. Las cifras no las genera ninguna IA: salen del BOE, de la Junta Electoral Central y del Ministerio del Interior, tal cual. No trabajo para ningún partido.`,
} as const;

/** Página que explica qué hace la IA, qué reviso yo y de dónde salen los datos. */
export const CONTENT_PROCESS = { href: '/como-hacemos-este-contenido', title: 'Cómo hacemos este contenido' } as const;

/** Nota de transparencia bajo el bloque de autor. */
export const AI_NOTE = `Contenido redactado con ayuda de IA y revisado por ${OWNER.name}.`;

/**
 * Mis webs y el canal. El pie muestra todas menos la actual (`CURRENT_PROJECT`).
 * Las páginas de ciudad y provincia enlazan a las de `CONTEXT_LINKS`.
 */
export const PROJECTS = [
  {
    id: 'finanzas',
    name: 'CapitalPráctico',
    url: 'https://capitalpractico.iaencrudo.es',
    description: 'Calculadoras y guías de finanzas personales',
  },
  {
    id: 'ahorro',
    name: 'AhorroLuz',
    url: 'https://ahorroluz.iaencrudo.es',
    description: 'Calculadoras y guías para pagar menos luz y gas',
  },
  {
    id: 'viajes',
    name: 'ViajaChollo',
    url: 'https://viajachollo.iaencrudo.es',
    description: 'Herramientas y guías para viajar barato',
  },
  {
    id: 'repostabarato',
    name: 'RepostaBarato',
    url: 'https://repostabarato.iaencrudo.es',
    description: 'La gasolinera más barata cerca de ti',
  },
  {
    id: 'vivienda',
    name: 'ViviendaClara',
    url: 'https://viviendaclara.iaencrudo.es',
    description: 'Busca piso según tu presupuesto, con datos oficiales',
  },
  {
    id: 'puentes',
    name: 'Vacacionable',
    url: 'https://vacacionable.iaencrudo.es',
    description: 'Festivos, puentes y vacaciones de 2027',
  },
  {
    id: 'elecciones',
    name: 'Elecciones al Día',
    url: 'https://elecciones.iaencrudo.es',
    description: 'Guía y datos oficiales de las elecciones del 29-N',
  },
  {
    id: 'canal',
    name: CHANNEL.name,
    url: CHANNEL.url,
    description: 'Canal de YouTube: cómo hago estas webs con IA',
  },
] as const;

export type ProjectId = (typeof PROJECTS)[number]['id'];
export const CURRENT_PROJECT: ProjectId = 'elecciones';

export function getProject(id: ProjectId) {
  return PROJECTS.find((p) => p.id === id)!;
}

/** Enlaces a otras de mis webs al final de las páginas de ciudad y provincia (`path`: ruta en esa web). */
export const CONTEXT_LINKS: readonly { project: ProjectId; path: string; text: string }[] = [
  {
    project: 'puentes',
    path: '/',
    text: '¿Te toca mesa electoral o trabajas el domingo? Mira festivos y días libres en Vacacionable.',
  },
  {
    project: 'vivienda',
    path: '/',
    text: 'Precios oficiales de alquiler y compra en cada ciudad, en ViviendaClara.',
  },
];

/** Aviso al final de las páginas de ciudad y provincia y en /sobre-mi. */
export const CHANNEL_NOTE = `Mira cómo hice esta web con IA en mi canal ${CHANNEL.name}`;

/**
 * Newsletter. Mientras `formAction` esté vacío, el bloque no se muestra.
 * `provider`: nombre del servicio (p. ej. "Brevo"); se menciona en la política de privacidad.
 * `formAction`: URL a la que el proveedor indica enviar su formulario (método POST, campo "email").
 */
export const NEWSLETTER = {
  provider: '',
  formAction: '',
  title: 'Te aviso de los plazos de las elecciones',
  text: 'Un correo antes de cada plazo importante. Sin spam: te das de baja con un clic.',
} as const;

export function isNewsletterEnabled(): boolean {
  return NEWSLETTER.formAction.trim() !== '';
}

/**
 * Google Analytics 4 ("G-XXXXXXXXXX"). Vacío: no se carga nada.
 * Con Consent Mode v2 todo empieza denegado; la CMP de Google (AdSense) actualiza el consentimiento.
 */
export const GA4_ID = 'G-HQCZ2ZMCW4';

/**
 * Escrutinio en directo del 29-N: scripts/escrutinio.mjs escribe public/escrutinio.json y hace push;
 * cada despliegue de GitHub Pages purga su caché. /resultados-29n lo pide cada minuto.
 */
export const ESCRUTINIO_URL = '/escrutinio.json';

export function isAnalyticsEnabled(): boolean {
  return /^G-[A-Z0-9]+$/.test(GA4_ID.trim());
}

/** Devuelve el valor o un marcador visible "[Pendiente: …]". */
export function pending(value: string, label: string): string {
  return value.trim() !== '' ? value : `[Pendiente: ${label}]`;
}

export function isPending(value: string): boolean {
  return value.trim() === '';
}

export const NAV_LINKS = [
  { href: '/voto-por-correo', title: 'Voto por correo' },
  { href: '/propuestas', title: 'Propuestas' },
  { href: '/partidos', title: 'Partidos' },
  { href: '/provincias', title: 'Tu provincia' },
  { href: '/pactos', title: 'Pactos' },
  { href: '/herramientas', title: 'Herramientas' },
] as const;

/** Herramientas y guías, en el orden de portada, /herramientas y el pie. */
export const HERRAMIENTAS = [
  { href: '/propuestas', titulo: 'Qué propone cada partido', texto: 'Vivienda, impuestos, pensiones, inmigración: las medidas con su fuente.', icono: 'papeleta' },
  { href: '/voto-por-correo', titulo: 'Voto por correo', texto: 'Plazos, pasos y qué pasa si lo pides y luego quieres votar en persona.', icono: 'sobre' },
  { href: '/provincias', titulo: 'Candidatos de tu provincia', texto: 'Todas las listas al Congreso proclamadas en el BOE, nombre a nombre.', icono: 'mapa' },
  { href: '/pactos', titulo: 'Calculadora de pactos', texto: 'Suma escaños y comprueba qué combinaciones llegan a 176.', icono: 'pacto' },
  { href: '/simulador-dhondt', titulo: 'Simulador D\'Hondt', texto: 'Pon votos en tu provincia y mira cómo se reparten los escaños.', icono: 'grafica' },
  { href: '/cuanto-vale-tu-voto', titulo: '¿Cuánto vale tu voto?', texto: 'Electores por escaño en cada provincia: de Soria a Madrid.', icono: 'balanza' },
  { href: '/votos-que-no-sirvieron', titulo: 'Votos que no sirvieron', texto: 'Los votos de 2023 que no llegaron a ningún escaño, provincia a provincia.', icono: 'papelera' },
  { href: '/permiso-para-votar', titulo: 'Horas para votar', texto: 'Calcula cuántas horas pagadas te tiene que dar tu empresa.', icono: 'reloj' },
  { href: '/mesa-electoral', titulo: 'Si te toca mesa', texto: 'Dieta de 75 €, permisos, plazo para alegar y qué hace cada cargo.', icono: 'urna' },
  { href: '/voto-en-blanco-nulo-abstencion', titulo: 'Blanco, nulo o abstención', texto: 'Qué cuenta cada uno y a quién beneficia en el reparto.', icono: 'papeleta' },
  { href: '/donde-voto-y-que-llevar', titulo: 'Dónde voto y qué llevar', texto: 'Cómo saber tu colegio y qué documentos valen.', icono: 'dni' },
  { href: '/calendario', titulo: 'Calendario electoral', texto: 'Todas las fechas, de la convocatoria a la constitución de las Cortes.', icono: 'calendario' },
  { href: '/resultados-29n', titulo: 'Resultados del 29-N en directo', texto: 'Escaños, votos y participación mientras avanza el escrutinio, desde las 20:00.', icono: 'grafica' },
  { href: '/resultados-2023', titulo: 'Resultados de 2023', texto: 'Votos y escaños del 23-J, en España y en cada provincia.', icono: 'urna' },
] as const;

export const LEGAL_LINKS = [
  { href: '/aviso-legal', title: 'Aviso legal' },
  { href: '/politica-privacidad', title: 'Política de privacidad' },
  { href: '/politica-cookies', title: 'Política de cookies' },
  { href: '/creditos-imagenes', title: 'Créditos de las imágenes' },
] as const;

export const SITE_LINKS = [
  { href: '/sobre-mi', title: 'Sobre mí' },
  { href: '/contacto', title: 'Contacto' },
  { href: CONTENT_PROCESS.href, title: CONTENT_PROCESS.title },
] as const;

/** Quita la ruta base de un pathname: '/elecciones-web/contacto' → '/contacto'. */
export function stripBase(pathname: string): string {
  if (BASE_PATH && (pathname === BASE_PATH || pathname.startsWith(`${BASE_PATH}/`))) {
    return pathname.slice(BASE_PATH.length) || '/';
  }
  return pathname;
}

/** URL absoluta de una ruta interna ('/contacto'), incluida la ruta base. */
export function absoluteUrl(path: string): string {
  const clean = stripBase(path.startsWith('/') ? path : `/${path}`);
  return `${SITE.url}${clean}`;
}
