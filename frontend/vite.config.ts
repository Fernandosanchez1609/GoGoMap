import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
<<<<<<< HEAD
=======
import path from 'path'
>>>>>>> 2b9798049a4eee39fa0a16eddfdf20cfaee9d0be

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
<<<<<<< HEAD
          tailwindcss(),
  ],
=======
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
>>>>>>> 2b9798049a4eee39fa0a16eddfdf20cfaee9d0be
})
