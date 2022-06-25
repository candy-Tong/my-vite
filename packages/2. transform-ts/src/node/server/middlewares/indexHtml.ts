import { NextHandleFunction } from 'connect';
import path from 'path';
import { pathExists, readFile } from 'fs-extra';
import { ViteDevServer } from '../index';

/**
 * 简单无插件版本
 * @param {ViteDevServer} server
 * @returns {createServer.NextHandleFunction}
 */
export function indexHtmlMiddleware(server: ViteDevServer): NextHandleFunction {
  return async (req, res, next) => {
    if (req.url === '/') {
      // 默认使用项目根目录下的 index.html
      const indexHtmlPath = path.join(server.root, 'index.html');
      if (await pathExists(indexHtmlPath)) {
        const html = await readFile(indexHtmlPath, 'utf8');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        return res.end(html);
      }
    }
    return next();
  };
}

// export function indexHtmlMiddleware(
//   server: ViteDevServer
// ): NextHandleFunction {
//   return async (req, res, next) => {
//     if (req.url === '/') {
//       // 为了简单，先写死 root 就是 /
//       const root = '/';
//       // 默认使用项目根目录下的 index.html
//       const indexHtmlPath = path.join(root, 'index.html');
//       if (await pathExists(indexHtmlPath)) {
//         const rawHtml = await readFile(indexHtmlPath, 'utf8');
//         let html = rawHtml;
//         // 通过执行插件的 transformIndexHtml 方法来对 HTML 进行自定义的修改
//         for (const plugin of server.plugins) {
//           if (plugin.transformIndexHtml) {
//             html = await plugin.transformIndexHtml(html);
//           }
//         }
//
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html');
//         return res.end(html);
//       }
//     }
//     return next();
//   };
// }
