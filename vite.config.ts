import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'; // --> import it

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [react(), tsconfigPaths(), tsconfigPaths()],
    base: '',
    server: {
      port: +(env.VITE_APP_PORT ?? 3000),
    },
  });
};
