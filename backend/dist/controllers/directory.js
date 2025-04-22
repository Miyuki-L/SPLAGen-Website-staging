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
exports.getPublicDirectory = exports.denyDirectoryEntry = exports.approveDirectoryEntry = void 0;
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
const getPublicDirectory = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({
            "account.inDirectory": true,
            "account.membership": { $in: ["geneticCounselor", "healthcareProvider"] },
        });
        const directory = users.map((user) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
            return ({
                name: `${(_b = (_a = user.personal) === null || _a === void 0 ? void 0 : _a.firstName) !== null && _b !== void 0 ? _b : ""} ${(_d = (_c = user.personal) === null || _c === void 0 ? void 0 : _c.lastName) !== null && _d !== void 0 ? _d : ""}`,
                title: (_f = (_e = user.professional) === null || _e === void 0 ? void 0 : _e.title) !== null && _f !== void 0 ? _f : "Genetic Counselor",
                address: `${(_j = (_h = (_g = user.clinic) === null || _g === void 0 ? void 0 : _g.location) === null || _h === void 0 ? void 0 : _h.address) !== null && _j !== void 0 ? _j : ""} ${(_m = (_l = (_k = user.clinic) === null || _k === void 0 ? void 0 : _k.location) === null || _l === void 0 ? void 0 : _l.suite) !== null && _m !== void 0 ? _m : ""}`.trim(),
                organization: (_p = (_o = user.clinic) === null || _o === void 0 ? void 0 : _o.name) !== null && _p !== void 0 ? _p : "",
                email: (_t = (_r = (_q = user.display) === null || _q === void 0 ? void 0 : _q.workEmail) !== null && _r !== void 0 ? _r : (_s = user.personal) === null || _s === void 0 ? void 0 : _s.email) !== null && _t !== void 0 ? _t : "",
                phone: (_x = (_v = (_u = user.display) === null || _u === void 0 ? void 0 : _u.workPhone) !== null && _v !== void 0 ? _v : (_w = user.personal) === null || _w === void 0 ? void 0 : _w.phone) !== null && _x !== void 0 ? _x : "",
                specialties: (_z = (_y = user.display) === null || _y === void 0 ? void 0 : _y.services) !== null && _z !== void 0 ? _z : [],
                languages: [
                    ...((_1 = (_0 = user.display) === null || _0 === void 0 ? void 0 : _0.languages) !== null && _1 !== void 0 ? _1 : []),
                    ...(((_3 = (_2 = user.professional) === null || _2 === void 0 ? void 0 : _2.prefLanguages) === null || _3 === void 0 ? void 0 : _3.includes("other")) &&
                        user.professional.otherPrefLanguages
                        ? [user.professional.otherPrefLanguages]
                        : []),
                ],
                profileUrl: (_5 = (_4 = user.clinic) === null || _4 === void 0 ? void 0 : _4.url) !== null && _5 !== void 0 ? _5 : "",
            });
        });
        res.status(200).json(directory);
    }
    catch (err) {
        console.error("Error fetching directory:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getPublicDirectory = getPublicDirectory;
