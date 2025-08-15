import express from "express";
import { createServer as createVite } from "vite";
import { portal410 } from "./middleware-410.mjs";

async function start(){
  const app = express();
  const vite = await createVite({ server: { middlewareMode: true } });
  app.use(portal410);
  app.use(vite.middlewares);
  app.listen(8084, () => console.log("Dev on http://localhost:8084"));
}
start();
