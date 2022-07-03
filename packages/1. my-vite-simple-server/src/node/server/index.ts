import connect from 'connect';
import http from 'http';
import { staticMiddleware } from './middlewares/static';
import { transformMiddleware } from './middlewares/transform';
import { cssMiddleware } from './middlewares/css';

export interface ViteDevServer {
  root: string;
  plugins: [];
}

export async function createServer() {
  const app = connect();

  app.use(transformMiddleware());
  app.use(cssMiddleware());

  // 测试中间件
  // app.use(function(_, res){
  //   res.end('Hello from Connect!\n');
  // });

  app.use(staticMiddleware());

  http.createServer(app).listen(3000);

  console.log('open http://localhost:3000/');
}
