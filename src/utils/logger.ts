import { createLogger, transports, format } from "winston";
import "winston-daily-rotate-file";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }), // Ensure the stack trace is included
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level}]: ${message}${stack ? `\n${stack}` : ""}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      dirname: "./logs",
      filename: "application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export default logger;
