import { defineConfig } from 'my-vite-middleware-plugins';
import { lessPlugin } from './plugins/less';

export default defineConfig({
  plugins: [lessPlugin()],
});
