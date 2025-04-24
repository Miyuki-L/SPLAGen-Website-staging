"use strict";
/**
 * Parses .env parameters and ensures they are of required types and are not missing.
 * If any .env parameters are missing, the server will not start and an error will be thrown.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envalid_1 = require("envalid");
const validators_1 = require("envalid/dist/validators");
dotenv_1.default.config();
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, validators_1.port)(), // Port to run backend on
    MONGO_URI: (0, validators_1.str)(), // URI of MongoDB database to use
    FRONTEND_ORIGIN: (0, validators_1.str)(), // URL of frontend, to allow CORS from frontend
    EMAIL_USER: (0, validators_1.email)(), // Email address to use for sending emails
    EMAIL_APP_PASSWORD: (0, validators_1.str)(), // App password to use for sending emails
    BACKEND_FIREBASE_SETTINGS: (0, validators_1.json)(), // Firebase settings for backend, stored as a JSON string
    SERVICE_ACCOUNT_KEY: (0, validators_1.json)(), // Private service account key for backend, stored as a JSON string
    SECURITY_BYPASS: (0, validators_1.bool)(), // Security bypass around requireSignedIn middleware
});
