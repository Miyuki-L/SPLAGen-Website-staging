"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoURI = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
//load the env variables from .env file
dotenv_1.default.config({ path: ".env" });
function throwIfUndefined(envVar, error) {
    if (!envVar)
        throw error;
    return envVar;
}
const port = throwIfUndefined(process.env.PORT, new Error("No Port Found"));
exports.port = port;
const mongoURI = throwIfUndefined(process.env.MONGO_URI, new Error("No Mongo URI Found"));
exports.mongoURI = mongoURI;
