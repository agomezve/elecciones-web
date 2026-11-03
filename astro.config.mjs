// @ts-check
// Ruta: astro.config.mjs
import { defineConfig } from 'astro/config';

// Tailwind CSS 4 se integra como plugin de Vite. La antigua integración
// @astrojs/tailwind solo es compatible con Tailwind 3 y Astro <= 5.
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import basePathLinks from './integrations/base-path-links.mjs';
import ogImages from './integrations/og-images.mjs';


// https://astro.build/config
export default defineConfig({
  // ─── DOMINIO Y RUTA BASE ────────────────────────────────────────────────────
  // Subdominio propio servido por GitHub Pages (public/CNAME). Si cambias de dominio,
  // actualiza también public/CNAME y la línea "Sitemap:" de public/robots.txt.
  // Para volver a la URL de GitHub Pages: site 'https://agomezve.github.io' y base '/elecciones-web'.
  // El resto del código (canónicas, Open Graph, JSON-LD, sitemap y enlaces) se adapta solo.
  site: 'https://elecciones.iaencrudo.es',
  base: '/',

  // Astro 7 usa por defecto 'jsx', que elimina el espacio de un salto de línea entre
  // texto y enlace ("en la<a>…"). `true` comprime el HTML sin perder espacios visibles.
  compressHTML: true,

  // Sin la barra de herramientas de desarrollo (para que las capturas salgan limpias).
  devToolbar: { enabled: false },

  // URL limpias sin barra final: /provincias/madrid
  trailingSlash: 'never',
  build: {
    format: 'file',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404'),
    }),
    // Imagen Open Graph 1200×630 de cada página (colores de la marca).
    ogImages({ accent: '#f59e0b', glow: '#1e3a8a' }),
    basePathLinks(),
  ],
});
