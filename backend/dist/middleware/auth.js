"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.requireSuperAdmin = exports.requireAdminOrSuperAdmin = exports.requireSignedIn = void 0;
const user_1 = __importStar(require("../models/user"));
const firebase_1 = require("../util/firebase");
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
const DEFAULT_ERROR = 403;
const SECURITY_BYPASS_ENABLED = validateEnv_1.default.SECURITY_BYPASS;
// Firebase Authentication Verification
const verifyFirebaseToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify Firebase token using Firebase Admin SDK
        const decodedToken = yield firebase_1.firebaseAdminAuth.verifyIdToken(token);
        return decodedToken; // returns decoded user data, including UID
    }
    catch (error) {
        if (!(error instanceof Error)) {
            console.error("Unknown error verifying Firebase token:", error);
            throw new Error(`Token verification failed for token: ${token}. Unknown error occurred.`);
        }
        else {
            console.error("Error verifying Firebase token:", error);
            throw new Error(`Token verification failed for token: ${token}. Error details: ${error}`);
        }
    }
});
// Middleware to require the user to be signed in with a valid Firebase token
const requireSignedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Extract the Firebase token from the "Authorization" header
    const authHeader = req.headers.authorization;
    // Check if the header starts with "Bearer " and if the token is non-empty
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split("Bearer ")[1];
    if (!token) {
        res.status(403).send("Authorization token is missing or invalid.");
        return;
    }
    if (SECURITY_BYPASS_ENABLED) {
        req.firebaseUid = "unique-firebase-id-001";
        const user = yield user_1.default.findOne({ firebaseId: req.firebaseUid });
        if (!user) {
            res.status(401).send("User not found.");
            return;
        }
        console.warn("[SECURITY BYPASS] Skipping authentication for development mode.");
        req.role = user.role;
        req.mongoID = user._id;
        req.userEmail = (_a = user.personal) === null || _a === void 0 ? void 0 : _a.email;
        next();
        return;
    }
    try {
        // Verify the Firebase ID token
        const decodedToken = yield verifyFirebaseToken(token);
        if (decodedToken.email === undefined || !decodedToken.email_verified) {
            res.status(403).json({ error: "Please verify your email first!" });
            return;
        }
        // Fetch the user from MongoDB using the firebaseUid
        const user = yield user_1.default.findOne({ firebaseId: decodedToken.uid });
        if (!user) {
            res.status(401).send("User not found.");
            return;
        }
        // Attach user details to the request object for downstream routes
        req.firebaseUid = decodedToken.uid;
        req.role = user.role;
        req.mongoID = user._id;
        req.userEmail = (_b = user.personal) === null || _b === void 0 ? void 0 : _b.email;
        next();
    }
    catch (error) {
        console.error("Firebase token verification failed:", error);
        res.status(401).send("Token verification failed. Please log in again.");
        return;
    }
});
exports.requireSignedIn = requireSignedIn;
// Middleware to require the user to be an admin or superadmin
const requireAdminOrSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const user = yield user_1.default.findOne({ firebaseId: firebaseUid });
        if (!user || ![user_1.UserRole.ADMIN, user_1.UserRole.SUPERADMIN].includes(user.role)) {
            res.status(DEFAULT_ERROR).send("User is not an admin or super admin");
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.requireAdminOrSuperAdmin = requireAdminOrSuperAdmin;
// Middleware to require the user to be a superadmin
const requireSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const user = yield user_1.default.findOne({ firebaseId: firebaseUid });
        if (!user || user.role !== user_1.UserRole.SUPERADMIN) {
            res.status(DEFAULT_ERROR).send("User is not a super admin");
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.requireSuperAdmin = requireSuperAdmin;
