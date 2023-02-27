import pluginReact from '@vitejs/plugin-react';
import { join } from 'path';
import { build as viteBuild, InlineConfig } from "vite"
import * as fs from 'fs-extra'
import { CLIENT_ENTRY_PATH, SSR_ENTRY_PATH } from "./const"
import type { RollupOutput } from 'rollup'

export const build = async (root: string = process.cwd()) => {
  // @ts-ignore
  const [clientBuild] = await bundle(root)

  const serverEntryPath = join(root, '.temp', 'ssr-entry.js')
  const { render } = require(serverEntryPath)
  await renderPage(render, root, clientBuild)
}

export const bundle = async (root: string) => {
  const resolveConfig = (isServer:boolean): InlineConfig => ({
    mode: 'production',
    root,
    plugins: [pluginReact()],
    build: {
      ssr: isServer,
      assetsDir: isServer ? 'assets' : '',
      outDir: isServer ? '.temp' : 'build',
      rollupOptions: {
        input: isServer ? SSR_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: isServer
          ? { format: 'cjs', entryFileNames: '[name].js'}
          : { format: 'esm', entryFileNames: '[name].js' }
      }
    }
  })

  try {
    const [clientBundle, serverBundle] = await Promise.all([
      viteBuild(resolveConfig(false)),
      viteBuild(resolveConfig(true)),
    ]);
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (error) {
    console.log(error)
  }
}

export const renderPage = async (
  render: () => string,
  root: string,
  clientBuild: RollupOutput
  ) => {
    const clientChunk = clientBuild.output.find((chunk) => chunk.type === 'chunk' && chunk.isEntry)
    const appHtml = render()
    const html = `
    <!DOCTYPE html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>title</title>
        <meta name="description" content="xxx">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="./${clientChunk?.fileName}"></script>
      </body>
    </html>
    `.trim()

    await fs.ensureDir(join(root, "build"));
    await fs.writeFile(join(root, "build/index.html"), html);
    await fs.remove(join(root, ".temp"));
}