/*
初始化内部插件
 */
import { Plugin } from '../server/plugin';
import { cssPlugin, cssPostPlugin } from './css';
import { staticPlugin } from './static';
import { esbuildPlugin } from './esbuild';

export function loadInternalPlugins(): Plugin[] {
  return [esbuildPlugin(), cssPlugin(), cssPostPlugin(), staticPlugin()];
}
