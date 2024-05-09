import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(process.env.BUILD_TYPE === 'server'? {
  build: {
    target: 'esnext',
    ssr: 'noExternal',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: [
        'src/server/server.ts',
      ],
      formats: ['es'],
      name: 'actions',
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        inlineDynamicImports: false,
      }
    },
  },
}
:
{
  plugins: [react()],
  build: {
    outDir: 'dist/public',
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        manualChunks: {
          react: ['react'],
          spectrum: ['@adobe/react-spectrum']
        }
      }
      //   // make sure to externalize deps that shouldn't be bundled
      //   // into your library
      //   external: ['vue'],
      //   output: {
      //     // Provide global variables to use in the UMD build
      //     // for externalized deps
      //     globals: {
      //       vue: 'Vue',
      //     },
      //   },
    },
  },
})