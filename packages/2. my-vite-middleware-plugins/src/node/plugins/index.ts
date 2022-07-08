/*
初始化内部插件
 */
import { Plugin } from '../server/plugin';
import { cssPlugin } from './css';
import { staticPlugin } from './static';
import { transformPlugin } from './transform';

export function loadInternalPlugins(): Plugin[] {
  return [transformPlugin(), cssPlugin(), staticPlugin()];
}
