import { createServer as createViteDevServer } from 'vite';
import { pluginHtml } from './plugin-wille/html';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './const';
import { resolveConfig } from './config';

export const createDevServer = async (root = process.cwd()) => {
  const config = await resolveConfig(root, 'serve', 'development');
  console.log(config, 'configgggggg');
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
