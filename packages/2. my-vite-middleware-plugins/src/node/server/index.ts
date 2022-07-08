import connect from 'connect';
import http from 'http';
import { loadInternalPlugins } from '../plugins';
import { Plugin } from './plugin';
import { resolveConfig, ResolvedConfig } from '../config';

export interface ViteDevServer {
  plugins: Plugin[];
  app: connect.Server;
  config: ResolvedConfig;
}

export async function createServer() {
  const config = await resolveConfig();

  const plugins = [...(config.plugins || []), ...loadInternalPlugins()];
  const app = connect();

  // server 作为上下文对象，用于保存一些状态和对象，将会在 Server 的各个流程中被使用
  const server: ViteDevServer = {
    plugins,
    app,
    config,
  };

  for (const plugin of plugins) {
    plugin?.configureServer?.(server);
  }

  http.createServer(app).listen(3000);

  console.log('open http://localhost:3000/');
}
