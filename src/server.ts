import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({
  path: resolve(__dirname, `../.env`),
});

import app from "./app";
import http from "http";
import logger from "./utils/logger";
const server = http.createServer(app);

const port = process.env.PORT || 8080;
server.listen(port, async () => {
  logger.info(
    `[SERVER] Node ${process.env.ENVIRONMENT} API Server is running on port ${port}`
  );
});

process.on("unhandledRejection", (err: Error) => {
  logger.error("[DANGER] Unhandled Rejection! Server Stopped!");
  logger.error(err.name, err.message);
});

process.on("uncaughtException", (err) => {
  logger.error("[DANGER] Uncaught Exception! Server Stopped!");
  logger.error(err.name, err.message, err);
});
