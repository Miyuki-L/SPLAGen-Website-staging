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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSuperAdmin = exports.requireAdminOrSuperAdmin = exports.requireSignedIn = void 0;
const user_1 = __importStar(require("../models/user"));
const DEFAULT_ERROR = 403;
/**
 * A middleware that requires the user to be signed in and have a valid Firebase token
 * in the "Authorization" header
 */
const requireSignedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO uncomment when Firebase is set up
    // const authHeader = req.headers.authorization;
    // // Token should be "Bearer: <token>"
    // const token = authHeader?.split("Bearer ")[1];
    // if (!token) {
    //  return res.status(401).send("Token was not found in header. Be sure to use Bearer <Token> syntax");
    // }
    // let userInfo;
    // try {
    //   userInfo = await decodeAuthToken(token);
    // } catch (error) {
    //   return res.status(401).send("Token was invalid.");
    // })
    //TODO: remove temporary user info (the line below)
    const userInfo = { uid: "unique-firebase-id-002" };
    if (userInfo) {
        const user = yield user_1.default.findOne({ firebaseId: userInfo.uid });
        if (!user) {
            res.status(401).send("User not found");
            return;
        }
        req.firebaseUid = userInfo.uid;
        req.role = user.role;
        req.mongoID = user._id;
        next();
        return;
    }
    res.status(401).send("Token was invalid.");
});
exports.requireSignedIn = requireSignedIn;
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
