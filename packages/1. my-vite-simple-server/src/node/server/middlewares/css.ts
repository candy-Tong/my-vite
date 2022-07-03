import { NextHandleFunction } from 'connect';
import { cleanUrl, isCSSRequest } from '../../utils';
import { readFile } from 'fs-extra';

export function cssMiddleware(): NextHandleFunction {
  return async function viteTransformMiddleware(req, res, next) {
    if (req.method !== 'GET') {
      return next();
    }

    const url: string = cleanUrl(req.url!);

    if (isCSSRequest(url)) {
      const file = url.startsWith('/') ? '.' + url : url;
      const rawCode = await readFile(file, 'utf-8');

      res.setHeader('Content-Type', 'application/javascript');
      return res.end(`
        var style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.innerHTML = \`${rawCode} \`
        document.head.appendChild(style)
      `);
    }

    next();
  };
}
