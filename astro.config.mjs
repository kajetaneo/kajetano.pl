// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE i BASE ustawia GitHub Actions. Lokalnie: https://kajetano.pl i "/".
export default defineConfig({
  site: process.env.SITE || 'https://kajetano.pl',
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
  image: { layout: 'constrained' },
});
