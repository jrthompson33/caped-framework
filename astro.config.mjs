// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  // Set automatically in CI via actions/configure-pages (see .github/workflows/deploy.yml)
  site: process.env.ASTRO_SITE,
  base: process.env.ASTRO_BASE,
  integrations: [
    starlight({
      title: 'CAPED',
      description:
        'Supplemental materials for the CAPED framework — characterizing visualization authoring skills.',
      customCss: ['./src/styles/starlight.css'],
      tableOfContents: false,
      pagefind: false,
      sidebar: [
        { label: 'About CAPED', link: '#about-caped' },
        {
          label: 'Examples',
          items: [
            {
              label: 'Two Different Charts with the Same Tool',
              link: '#01-two-different-charts-with-the-same-tool',
            },
            {
              label: 'Skills Transfer between Tools',
              link: '#02-skills-transfer-between-tools',
            },
            {
              label: 'Different Authoring Skills to Work with AI',
              link: '#03-different-authoring-skills-to-work-with-ai',
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
