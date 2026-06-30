// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  // Set automatically in CI via actions/configure-pages (see .github/workflows/deploy.yml)
  site: process.env.ASTRO_SITE,
  // configure-pages emits base_path without a trailing slash (e.g. /caped-framework)
  base: process.env.ASTRO_BASE
    ? `${process.env.ASTRO_BASE.replace(/\/$/, '')}/`
    : undefined,
  integrations: [
    starlight({
      title: 'CAPED',
      description:
        'Supplemental materials for the CAPED framework — characterizing visualization authoring skills.',
      components: {
        PageTitle: './src/components/overrides/PageTitle.astro',
      },
      customCss: ['./src/styles/starlight.css'],
      tableOfContents: false,
      pagefind: false,
      sidebar: [
        { label: 'About CAPED', link: '#about-caped' },
        {
          label: 'Scenarios',
          items: [
            {
              label: '1. Two Different Charts with the Same Tool',
              link: '#scenario-01',
            },
            {
              label: '2. Skills Transfer between Tools',
              link: '#scenario-02',
            },
            {
              label: '3. Different Authoring Skills to Work with AI',
              link: '#scenario-03',
            },
            {
              label: '4. The Same Chart Using the Same Tool',
              link: '#scenario-04',
            },
          ],
        },
      ],
    }),
    react(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
