import { Plugin } from 'vite';
import { RouteService } from './RouteService';

interface PluginOptions {
  root: string;
}

export const CONVENTIONAL_ROUTE_ID = 'wille:routes';

export const pluginRoutes = (options: PluginOptions): Plugin => {
  const routeService = new RouteService(options.root);
  return {
    name: 'wille:routes',
    async configResolved() {
      await routeService.init();
    },
    resolveId(id: string) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return '\0' + id;
      }
    },
    load(id: string) {
      if (id === '\0' + CONVENTIONAL_ROUTE_ID) {
        return routeService.generateRoutesCode();
      }
    }
  };
};
