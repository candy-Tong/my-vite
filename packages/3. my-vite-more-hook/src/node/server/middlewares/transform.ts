import { NextHandleFunction } from 'connect';
import { isCSSRequest, isJSRequest } from '../../utils';
import { transform } from 'esbuild';
import path from 'path';
import { readFile } from 'fs-extra';
import { ViteDevServer } from '../index';
import { TransformResult } from '../plugin';

export function transformMiddleware(server: ViteDevServer): NextHandleFunction {
  return async function viteTransformMiddleware(req, res, next) {
    if (req.method !== 'GET') {
      return next();
    }

    const url: string = req.url!;

    if (isJSRequest(url) || isCSSRequest(url)) {
      // 解析模块路径
      const file = url.startsWith('/') ? '.' + url : url;
      // 加载文件，获取文件的内容
      let code: string = await readFile(file, 'utf-8');
      for (const plugin of server.plugins) {
        if (!plugin.transform) continue;
        let result: TransformResult;
        try {
          result = await plugin.transform(code, url);
        } catch (e) {
          console.error(e);
        }
        if (!result) continue;
        code = result;
      }
      return code;
    }

    // if (isJSRequest(url)) {
    //   const result = await doTransform(url);
    //   if (result) {
    //     // const code = result.code;
    //     const code = getCodeWithSourcemap(result.code, result.map);
    //     res.setHeader('Content-Type', 'application/javascript');
    //     return res.end(code);
    //   }
    // }

    next();
  };
}

export async function doTransform(url: string) {
  const extname = path.extname(url).slice(1);
  const file = url.startsWith('/') ? '.' + url : url;
  const rawCode = await readFile(file, 'utf-8');

  const { code, map } = await transform(rawCode, {
    target: 'esnext',
    format: 'esm',
    sourcemap: true,
    loader: extname as 'js' | 'ts' | 'jsx' | 'tsx',
  });

  return {
    code,
    map,
  };
}
