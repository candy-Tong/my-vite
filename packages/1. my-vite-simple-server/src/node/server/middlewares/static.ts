import { NextHandleFunction } from 'connect';
// 一个用于加载静态资源的中间件
import sirv from 'sirv';

export function staticMiddleware(): NextHandleFunction {
  const serveFromRoot = sirv('./', { dev: true });
  return async (req, res, next) => {
    if (!req.url) {
      return;
    }

    serveFromRoot(req, res, next);
  };
}
