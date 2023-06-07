import { defineConfig } from 'vite'
import dns from 'dns'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), vanillaExtractPlugin()],
  server: {
    port: 4000,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  },
  base: '/demo-dapp'
})
