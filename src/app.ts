import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import { CustomError } from "./common/types";
import logger from "./utils/logger";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));

// Use morgan with winston to log HTTP requests
app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => {
        logger.info(message.trim()); // Pass the morgan log to winston logger
      },
    },
  })
);

/* Security */

// Set security HTTP headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self' *"],
      // Add other directives as needed
    },
  })
);

app.use(cors());

// Limit request from the same IP
const limiter = rateLimit({
  max: 1000, // If someone performs 1000 calls in 5 minutes, error message will be shown, and they cannot make call for the next 5 minutes
  windowMs: 1 * 60 * 1000, // 5 Minutes
  message: "Too Many Request from this IP, please try again after sometime",
});
app.use("/", limiter);

// Prevent parameter pollution
app.use(hpp());

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
};
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: `[${process.env.ENVIRONMENT}] All is well.` });
});

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const err: CustomError = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error("err", err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

export default app;
