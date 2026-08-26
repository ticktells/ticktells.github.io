import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sites } from '@openai/sites-vite-plugin'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import mdx from '@mdx-js/rollup'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

const staticWorker = () => ({
  name: 'ticktells-static-worker',
  apply: 'build',
  async closeBundle() {
    const serverDirectory = resolve(process.cwd(), 'dist/server')
    await mkdir(serverDirectory, { recursive: true })
    await writeFile(
      resolve(serverDirectory, 'index.js'),
      `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request)
  }
}\n`,
    )
  },
})

const hasSitesHosting = existsSync(resolve(process.cwd(), '.openai/hosting.json'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ...(hasSitesHosting ? [sites(), staticWorker()] : []),
    mdx({
      jsxImportSource: 'vue',
      remarkPlugins: [
        remarkMath,
        remarkGfm,
      ],
      rehypePlugins: [
        rehypeKatex,
      ],
    }),
  ],
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
