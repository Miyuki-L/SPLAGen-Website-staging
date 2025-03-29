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
exports.getDiscussion = exports.getMultipleDiscussions = exports.deleteMultipleDiscussions = exports.deleteDiscussion = exports.editDiscussion = exports.createDiscussion = void 0;
const mongoose_1 = require("mongoose");
const discussionPost_1 = __importDefault(require("../models/discussionPost"));
const reply_1 = __importDefault(require("../models/reply"));
const user_1 = require("../models/user");
// Create a discussion post
const createDiscussion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, message, channel } = req.body;
        const userId = req.mongoID;
        const newDiscussion = new discussionPost_1.default({ userId, title, message, channel });
        yield newDiscussion.save();
        res.status(201).json({ message: "Discussion created successfully", discussion: newDiscussion });
    }
    catch (error) {
        next(error);
    }
});
exports.createDiscussion = createDiscussion;
// Edit a discussion post
const editDiscussion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, message, channel } = req.body;
        const userUid = req.mongoID;
        // Ensure the id is valid
        const objectId = mongoose_1.Types.ObjectId.isValid(id) ? new mongoose_1.Types.ObjectId(id) : null;
        if (!objectId) {
            res.status(400).json({ error: "Invalid ID format" });
            return;
        }
        // Find the discussion by ID
        const discussion = yield discussionPost_1.default.findById(objectId);
        if (!discussion) {
            res.status(404).json({ error: "Discussion not found" });
            return;
        }
        //Ensure user is the poster
        if (!discussion.userId.equals(userUid)) {
            res.status(403).json({ error: "Unauthorized: You can only edit your own posts" });
            return;
        }
        // Update the discussion if the user is authorized
        const result = yield discussionPost_1.default.updateOne({ _id: objectId }, { $set: { title, message, channel } });
        if (!result.acknowledged) {
            res.status(400).json({ error: "Discussion not updated" });
            return;
        }
        res.status(200).json({ message: "Discussion updated successfully", discussion });
    }
    catch (error) {
        next(error);
    }
});
exports.editDiscussion = editDiscussion;
// Delete a discussion post
const deleteDiscussion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userUid = req.mongoID;
        const role = req.role;
        // Find the discussion by ID
        const discussion = yield discussionPost_1.default.findById(id);
        if (!discussion) {
            res.status(404).json({ error: "Discussion not found" });
            return;
        }
        if (!discussion.userId.equals(userUid) &&
            ![user_1.UserRole.ADMIN, user_1.UserRole.SUPERADMIN].includes(role)) {
            res
                .status(403)
                .json({ error: "Unauthorized: You can only delete your own posts or are an admin" });
            return;
        }
        const result = yield discussionPost_1.default.deleteOne({ _id: id });
        if (!result.acknowledged) {
            res.status(400).json({ error: "Discussion was not deleted" });
            return;
        }
        // Delete replies associated with the discussion
        yield reply_1.default.deleteMany({ postId: id });
        res.status(200).json({ message: "Discussion deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteDiscussion = deleteDiscussion;
// Delete multiple discussion posts
const deleteMultipleDiscussions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids } = req.body;
        const result = yield discussionPost_1.default.deleteMany({ _id: { $in: ids } });
        if (!result.acknowledged) {
            res.status(400).json({ error: "Discussions was not deleted" });
            return;
        }
        // Delete replies associated with the discussions
        yield reply_1.default.deleteMany({ postId: { $in: ids } });
        res.status(200).json({
            message: `${result.deletedCount.toString()} discussion(s) deleted successfully`,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteMultipleDiscussions = deleteMultipleDiscussions;
// Get multiple discussion posts
const getMultipleDiscussions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const discussions = yield discussionPost_1.default.find();
        res.status(200).json({ discussions });
    }
    catch (error) {
        next(error);
    }
});
exports.getMultipleDiscussions = getMultipleDiscussions;
// Get an individual discussion post
const getDiscussion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const discussion = yield discussionPost_1.default.findById(id);
        if (!discussion) {
            res.status(404).json({ error: "Discussion not found" });
        }
        res.status(200).json({ discussion });
    }
    catch (error) {
        next(error);
    }
});
exports.getDiscussion = getDiscussion;
