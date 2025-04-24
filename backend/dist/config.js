"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.mongoURI = void 0;
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoURI = validateEnv_1.default.MONGO_URI;
exports.mongoURI = mongoURI;
const port = validateEnv_1.default.PORT;
exports.port = port;
