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
exports.denyDirectoryEntry = exports.approveDirectoryEntry = void 0;
const user_1 = __importStar(require("../models/user"));
const emailService_1 = require("../services/emailService");
const approveDirectoryEntry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pendingUserUid = req.body.firebaseId;
        const user = yield user_1.default.findOne({ firebaseId: pendingUserUid });
        if (!user || !user.personal || !user.account) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        if (user.account.inDirectory !== "pending") {
            res.status(400).json({ error: "User has not requested to be in the directory" });
            return;
        }
        if (![user_1.UserMembership.GENETIC_COUNSELOR, user_1.UserMembership.HEALTHCARE_PROVIDER].includes(user.account.membership)) {
            res.status(400).json({ error: "User is not a genetic counselor or healthcare provider" });
            return;
        }
        user.account.inDirectory = true;
        yield user.save();
        const { firstName, email } = user.personal;
        yield (0, emailService_1.sendDirectoryApprovalEmail)(email, firstName);
        res.status(200).json({ message: "Directory entry approved and email sent" });
    }
    catch (error) {
        next(error);
    }
});
exports.approveDirectoryEntry = approveDirectoryEntry;
const denyDirectoryEntry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // firebaseID for the the user to be denied
        const { firebaseId, reason } = req.body;
        const user = yield user_1.default.findOne({ firebaseId });
        if (!user || !user.personal || !user.account) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        if (user.account.inDirectory !== "pending") {
            res.status(400).json({ error: "User has not requested to be in the directory" });
            return;
        }
        user.account.inDirectory = false;
        yield user.save();
        const { firstName, email } = user.personal;
        yield (0, emailService_1.sendDirectoryDenialEmail)(email, firstName, reason);
        res.status(200).json({ message: "Directory entry denied and email sent" });
    }
    catch (error) {
        next(error);
    }
});
exports.denyDirectoryEntry = denyDirectoryEntry;
