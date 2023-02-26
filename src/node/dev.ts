import { createServer as createViteDevServer } from 'vite'
import { pluginHtml } from './plugin-wille/html'
import pluginReact from '@vitejs/plugin-react'

export const createDevServer = async (root = process.cwd()) => {
  return createViteDevServer({
    root,
    plugins: [pluginHtml(), pluginReact()]
  })
}
