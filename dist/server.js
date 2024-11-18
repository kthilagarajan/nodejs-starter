"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config({
    path: (0, path_1.resolve)(__dirname, `../.env`),
});
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app_1.default);
const port = process.env.PORT || 8080;
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[SERVER] Node ${process.env.ENVIRONMENT} API Server is running on port ${port}`);
}));
process.on("unhandledRejection", (err) => {
    console.log("[DANGER] Unhandled Rejection! Server Stopped!");
    console.trace(err);
    console.log(err.name, err.message);
});
process.on("uncaughtException", (err) => {
    console.log("[DANGER] Uncaught Exception! Server Stopped!");
    console.log(err.name, err.message, err);
});
