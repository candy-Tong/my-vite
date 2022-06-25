import { ServerResponse } from 'http';

const alias: Record<string, string | undefined> = {
  js: 'application/javascript',
  css: 'text/css',
  html: 'text/html',
  json: 'application/json',
};

export function send(res: ServerResponse, content: string | Buffer, type: string): void {
  res.setHeader('Content-Type', alias[type] || type);

  res.statusCode = 200;
  res.end(content);
  return;
}
