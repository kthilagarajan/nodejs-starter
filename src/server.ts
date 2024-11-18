import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({
  path: resolve(__dirname, `../.env`),
});

import app from "./app";
import http from "http";
const server = http.createServer(app);

const port = process.env.PORT || 8080;
server.listen(port, async () => {
  console.log(
    `[SERVER] Node ${process.env.ENVIRONMENT} API Server is running on port ${port}`
  );
});

process.on("unhandledRejection", (err: Error) => {
  console.log("[DANGER] Unhandled Rejection! Server Stopped!");
  console.trace(err);
  console.log(err.name, err.message);
});

process.on("uncaughtException", (err) => {
  console.log("[DANGER] Uncaught Exception! Server Stopped!");
  console.log(err.name, err.message, err);
});
