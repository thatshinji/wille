import { relative, join } from 'path';
import { Plugin } from 'vite';
import { SiteConfig } from 'shared/types';
import { PACKAGE_ROOT } from '../../node/const';

const SITE_DTA_ID = 'wille:site-data';

export const pluginConfig = (
  config: SiteConfig,
  restartServer?: () => Promise<void>
): Plugin => {
  //  let server: ViteDevServer | null = null;
  return {
    name: 'wille:config',
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts')
          }
        }
      };
    },
    //    configureServer(s) {
    //      server = s;
    //    },
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
        if (restartServer) {
          await restartServer();
        }
      }
    }
  };
};
