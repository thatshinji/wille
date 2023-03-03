import { createServer as createViteDevServer } from 'vite';
import { pluginHtml } from './plugin-wille/html';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './const';
import { pluginConfig } from './plugin-wille/config';
import { resolveConfig } from './config';

export const createDevServer = async (
  root = process.cwd(),
  restartServer: () => Promise<void>
) => {
  const config = await resolveConfig(root, 'serve', 'development');
  return createViteDevServer({
    root,
    plugins: [pluginHtml(), pluginReact(), pluginConfig(config, restartServer)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
};
