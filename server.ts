import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import { apiRouter } from "./server/api.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function createServer() {
  const app = express()
  const port = process.env.PORT || 3000
  const isProd = process.env.NODE_ENV === "production"

  app.use(express.json({ limit: "15mb" }))
  app.use(express.urlencoded({ extended: true, limit: "15mb" }))

  // Mount API
  app.use("/api", apiRouter)

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite")
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    })

    app.use(vite.middlewares)
    app.use(async (req, res, next) => {
      const url = req.originalUrl
      try {
        let template = await vite.transformIndexHtml(
          url,
          await import("fs").then((fs) => fs.promises.readFile(path.resolve(__dirname, "index.html"), "utf-8"))
        )
        res.status(200).set({ "Content-Type": "text/html" }).end(template)
      } catch (e: any) {
        vite.ssrFixStacktrace(e)
        next(e)
      }
    })
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")))
    app.use((req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"))
    })
  }

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
  })
}

createServer().catch((err) => {
  console.error("Failed to start server:", err)
  process.exit(1)
})
