"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "50mb" }));
/* Logging */
app.use((0, morgan_1.default)(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms'));
/* Security */
// Set security HTTP headers
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self' *"],
        // Add other directives as needed
    },
}));
app.use((0, cors_1.default)());
// Limit request from the same IP
const limiter = (0, express_rate_limit_1.default)({
    max: 1000, // If someone performs 1000 calls in 5 minutes, error message will be shown, and they cannot make call for the next 5 minutes
    windowMs: 1 * 60 * 1000, // 5 Minutes
    message: "Too Many Request from this IP, please try again after sometime",
});
app.use("/", limiter);
// Prevent parameter pollution
app.use((0, hpp_1.default)());
const errorHandler = (err, req, res, next) => {
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
app.use("*", (req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    console.log("err", err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});
exports.default = app;
