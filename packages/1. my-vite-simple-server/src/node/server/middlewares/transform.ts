import { NextHandleFunction } from 'connect';
import { cleanUrl, isJSRequest } from '../../utils';
import { transform } from 'esbuild';
import path from 'path';
import { readFile } from 'fs-extra';
import { getCodeWithSourcemap } from '../sourcemap';

const knownIgnoreList = new Set(['/', '/favicon.ico']);

export function transformMiddleware(): NextHandleFunction {
  return async function viteTransformMiddleware(req, res, next) {
    if (req.method !== 'GET' || knownIgnoreList.has(req.url!)) {
      return next();
    }

    const url: string = req.url!;

    if (isJSRequest(url)) {
      const result = await doTransform(url);
      if (result) {
        // const code = result.code;
        const code = getCodeWithSourcemap(result.code, result.map);
        res.setHeader('Content-Type', 'application/javascript');
        return res.end(code);
      }
    }

    next();
  };
}

export async function doTransform(url: string) {
  const extname = path.extname(cleanUrl(url)).slice(1);
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
