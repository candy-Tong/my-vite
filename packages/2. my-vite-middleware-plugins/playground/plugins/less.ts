import { Plugin } from 'my-vite-middleware-plugins';
import { NextHandleFunction } from 'connect';
import { cleanUrl } from '../../src/node/utils';
import { readFile } from 'fs-extra';
import postcss from 'postcss';
import atImport from 'postcss-import';
import less from 'less';

export function lessPlugin(): Plugin {
  return {
    configureServer(server) {
      console.log('less');
      server.app.use(lessMiddleware());
    },
  };
}

const lessLangRE = new RegExp(/\.less$/);
export const isLessRequest = (request: string): boolean => lessLangRE.test(request);

function lessMiddleware(): NextHandleFunction {
  return async function viteLessMiddleware(req, res, next) {
    if (req.method !== 'GET') {
      return next();
    }

    const url: string = cleanUrl(req.url!);

    if (isLessRequest(url)) {
      const file = url.startsWith('/') ? '.' + url : url;
      const rawCode = await readFile(file, 'utf-8');

      // 预处理器处理 less
      const lessResult = await less.render(rawCode);
      // 后处理器处理 css
      const postcssResult = await postcss([atImport()]).process(lessResult.css, {
        from: file,
        to: file,
      });

      res.setHeader('Content-Type', 'application/javascript');
      return res.end(`
        var style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.innerHTML = \`${postcssResult.css} \`
        document.head.appendChild(style)
      `);
    }

    next();
  };
}
