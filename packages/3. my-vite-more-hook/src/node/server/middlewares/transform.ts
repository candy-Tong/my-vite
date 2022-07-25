import { NextHandleFunction } from 'connect';
import { isCSSRequest, isJSRequest } from '../../utils';
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

      // 遍历所有的插件
      for (const plugin of server.plugins) {
        if (!plugin.transform) continue;
        let result: TransformResult;
        try {
          result = await plugin.transform(code, url);
        } catch (e) {
          console.error(e);
        }
        // 如果返回为空，则表示当前钩子不转换当前模块
        if (!result) continue;
        // 如果有返回值，用结果覆盖 code，作为入参传给下一个 transform 钩子
        code = result;
      }
      res.setHeader('Content-Type', 'application/javascript');
      // 最终的 code 就是转换后的代码
      return res.end(code);
    }
    next();
  };
}
