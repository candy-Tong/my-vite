import { NextHandleFunction } from 'connect';
import { cleanUrl, isJSRequest } from '../../utils';
import { transform } from 'esbuild';
import path from 'path';
import { readFile } from 'fs-extra';
// import {send} from '../send';

const knownIgnoreList = new Set(['/', '/favicon.ico']);

export function transformMiddleware(): NextHandleFunction {
  return async function viteTransformMiddleware(req, res, next) {
    if (req.method !== 'GET' || knownIgnoreList.has(req.url!)) {
      return next();
    }

    const url: string = req.url!;

    if (isJSRequest(url)) {
      const { code } = await doTransform(url);
      if (code) {
        // return send(res, code, 'js');
        return res.end(code);
      }
    }

    next();
  };
}

export async function doTransform(url: string) {
  const extname = path.extname(cleanUrl(url)).slice(1);
  const file = url.startsWith('/') ? '.' + url : url;
  const code = await readFile(file, 'utf-8');

  const { code: transformedCode, map } = await transform(code, {
    target: 'esnext',
    format: 'esm',
    sourcemap: true,
    loader: extname as 'js' | 'ts' | 'jsx' | 'tsx',
  });

  return {
    code: transformedCode,
    map,
  };
}
