import { createServer as createViteDevServer } from 'vite'
import { pluginHtml } from './plugin-wille/html'

export const createDevServer = async (root = process.cwd()) => {
  return createViteDevServer({
    root,
    plugins: [pluginHtml()]
  })
}
