import { relative } from 'path';
import { Plugin, ViteDevServer } from 'vite';
import { SiteConfig } from 'shared/types';

const SITE_DTA_ID = 'wille:site-data';

export const pluginConfig = (
  config: SiteConfig,
  restartServer: () => Promise<void>
): Plugin => {
  let server: ViteDevServer | null = null;
  return {
    name: 'wille:config',
    configureServer(s) {
      server = s;
    },
    resolveId(id) {
      if (id === SITE_DTA_ID) {
        return '\0' + SITE_DTA_ID;
      }
    },
    load(id) {
      if (id === '\0' + SITE_DTA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    async handleHotUpdate(ctx) {
      const customWatchFiles = [config.configPath];
      const include = (id: string) =>
        customWatchFiles.some((file) => id.includes(file));
      if (include(ctx.file)) {
        console.log(
          `\n${relative(config.root, ctx.file)} changed, restarting server...`
        );
        await restartServer();
      }
    }
  };
};