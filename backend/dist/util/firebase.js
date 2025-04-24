"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAdminAuth = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const validateEnv_1 = __importDefault(require("./validateEnv"));
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp(validateEnv_1.default.BACKEND_FIREBASE_SETTINGS);
}
const firebaseAdminAuth = firebase_admin_1.default.auth();
exports.firebaseAdminAuth = firebaseAdminAuth;
