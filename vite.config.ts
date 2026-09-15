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

        try {
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

              if (fileSize === 0) {
                res.writeHead(200, { 'Content-Length': 0 })
                res.end()
                return
              }

              const range = req.headers.range
              const contentType = ext === '.mp4' ? 'video/mp4' : 'video/quicktime'

              if (range && typeof range === 'string' && range.startsWith('bytes=')) {
                const parts = range.replace(/^bytes=/, '').split('-')
                let start = parseInt(parts[0], 10)
                let end = parseInt(parts[1], 10)

                if (isNaN(start) && !isNaN(end)) {
                  start = Math.max(0, fileSize - end)
                  end = fileSize - 1
                } else if (!isNaN(start) && isNaN(end)) {
                  end = fileSize - 1
                }

                if (isNaN(start) || start < 0) start = 0
                if (isNaN(end) || end >= fileSize) end = fileSize - 1
                if (start > end) start = 0

                const chunksize = end - start + 1
                const file = fs.createReadStream(filePath, { start, end })

                res.writeHead(206, {
                  'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                  'Accept-Ranges': 'bytes',
                  'Content-Length': chunksize,
                  'Content-Type': contentType,
                })
                file.pipe(res)
                return
              } else {
                res.writeHead(200, {
                  'Content-Length': fileSize,
                  'Content-Type': contentType,
                  'Accept-Ranges': 'bytes',
                })
                fs.createReadStream(filePath).pipe(res)
                return
              }
            }
          }
        } catch (e) {
          console.error('Media stream error:', e)
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
