import { createServer as createViteDevServer } from 'vite';
import { pluginHtml } from './plugin-wille/html';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './const';

export const createDevServer = async (root = process.cwd()) => {
  return createViteDevServer({
    root,
    plugins: [pluginHtml(), pluginReact()],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
};
