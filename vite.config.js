import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Real_Car_Repairs/',
  plugins: [react(), reactScopedCssPlugin()]
});
