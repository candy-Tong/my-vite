import { ViteDevServer } from './index';

export type ServerHook = (server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>;

export type TransformResult = string | null | void;

export type TransformHook = (code: string, id: string) => Promise<TransformResult> | TransformResult;

export interface Plugin {
  configureServer?: ServerHook;
  transform?: TransformHook;
}
