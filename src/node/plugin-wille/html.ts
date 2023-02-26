import { readFile } from "fs/promises"
import { Plugin } from "vite";
import { DEFAULT_HTML_PATH, PACKAGE_ROOT } from "../const";

export const pluginHtml = (): Plugin => {
  return {
    name: "wille:html",
    apply: "serve",
    configureServer (server) {
      return () => {
        server.middlewares.use(async(req, res, next) => {
          let html = await readFile(DEFAULT_HTML_PATH, "utf-8")
          try {
            res.statusCode = 200
            res.setHeader("Content-Type", "text/html")
            res.end(html)
          } catch (e) {
            return next(e)
          }
        })
      }
    }
  } 
}