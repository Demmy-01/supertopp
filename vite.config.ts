import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function mediaStreamPlugin() {
  return {
    name: 'media-stream-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (!req.url) return next()

        const cleanUrl = decodeURIComponent(req.url.split('?')[0])
        const ext = path.extname(cleanUrl).toLowerCase()

        if (['.mov', '.mp4', '.webm', '.ogg'].includes(ext)) {
          let filePath = path.join(process.cwd(), 'public', cleanUrl)
          if (!fs.existsSync(filePath)) {
            filePath = path.join(process.cwd(), cleanUrl)
          }

          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const stat = fs.statSync(filePath)
            const fileSize = stat.size
            const range = req.headers.range
            const contentType = ext === '.mp4' ? 'video/mp4' : 'video/quicktime'

            if (range) {
              const parts = range.replace(/bytes=/, '').split('-')
              const start = parseInt(parts[0], 10)
              const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
              const chunksize = end - start + 1
              const file = fs.createReadStream(filePath, { start, end })
              const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType,
              }
              res.writeHead(206, head)
              file.pipe(res)
              return
            } else {
              const head = {
                'Content-Length': fileSize,
                'Content-Type': contentType,
                'Accept-Ranges': 'bytes',
              }
              res.writeHead(200, head)
              fs.createReadStream(filePath).pipe(res)
              return
            }
          }
        }
        next()
      })
    },
  }
}

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    mediaStreamPlugin(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.MOV', '**/*.mov', '**/*.mp4', '**/*.webm'],
})
