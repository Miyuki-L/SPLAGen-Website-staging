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
exports.deleteReply = exports.editReply = exports.getReplies = exports.createReply = void 0;
const reply_1 = __importDefault(require("../models/reply"));
const user_1 = require("../models/user");
const createReply = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.mongoID;
        const { postId, message } = req.body;
        const newReply = new reply_1.default({ userId, postId, message });
        yield newReply.save();
        res.status(201).json({ message: "Reply created successfully", reply: newReply });
    }
    catch (error) {
        next(error);
    }
});
exports.createReply = createReply;
const getReplies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const discussionReplies = yield reply_1.default.find({ postId });
        res.status(200).json({ replies: discussionReplies });
    }
    catch (error) {
        next(error);
    }
});
exports.getReplies = getReplies;
const editReply = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUid = req.mongoID;
        const { id } = req.params;
        const { message } = req.body;
        // Find the reply by ID
        const reply = yield reply_1.default.findById(id);
        if (!reply) {
            res.status(404).json({ error: "Reply not found" });
            return;
        }
        // Check if the user is the owner of the reply
        if (!reply.userId.equals(userUid)) {
            res.status(403).json({ error: "Unauthorized: You can only edit your own replies" });
            return;
        }
        // Update the reply
        reply.message = message;
        yield reply.save();
        res.status(200).json({ message: "Reply updated successfully", reply });
    }
    catch (error) {
        next(error);
    }
});
exports.editReply = editReply;
const deleteReply = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userUid = req.mongoID;
        const role = req.role;
        // Find the reply by ID
        const reply = yield reply_1.default.findById(id);
        if (!reply) {
            res.status(404).json({ error: "Reply not found" });
            return;
        }
        // Check if the user is the owner of the reply or an admin
        if (!reply.userId.equals(userUid) &&
            ![user_1.UserRole.ADMIN, user_1.UserRole.SUPERADMIN].includes(role)) {
            res
                .status(403)
                .json({ error: "Unauthorized: You can only delete your own posts or are an admin" });
            return;
        }
        // Delete the reply
        yield reply_1.default.deleteOne({ _id: id });
        res.status(200).json({ message: "Reply deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteReply = deleteReply;
