import { ViteDevServer } from './index';

export type ServerHook = (server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>;

export interface Plugin {
  configureServer?: ServerHook;
}
