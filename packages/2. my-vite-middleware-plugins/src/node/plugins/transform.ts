import { Plugin } from '../server/plugin';
import { transformMiddleware } from '../server/middlewares/transform';
export function transformPlugin(): Plugin {
  return {
    configureServer(server) {
      server.app.use(transformMiddleware());
    },
  };
}
