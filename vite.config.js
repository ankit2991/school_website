import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import https from "https";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
      proxy: {
        "/api": {
          // target: "https://schoolappapi.schoolsoftwaresolution.in",
          target: "https://newschoolprojectapi.schoolsoftwaresolution.in",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false, // Ignore SSL certificate errors
          agent: new https.Agent({
            rejectUnauthorized: false, // Disable SSL validation
          }),
        },
     
      },
    },
    define: {
      "process.env": {},
    },
})
