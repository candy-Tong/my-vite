import { Plugin } from '../server/plugin';
import { cssMiddleware } from '../server/middlewares/css';
export function cssPlugin(): Plugin {
  return {
    configureServer(server) {
      server.app.use(cssMiddleware());
    },
  };
}
