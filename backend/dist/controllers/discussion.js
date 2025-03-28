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
// Create a discussion post
const createDiscussion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, message, channel } = req.body;
        const newDiscussion = new discussionPost_1.default({ userId, title, message, channel, replies: [] });
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
        // Ensure the id is valid
        const objectId = mongoose_1.Types.ObjectId.isValid(id) ? new mongoose_1.Types.ObjectId(id) : null;
        if (!objectId) {
            res.status(400).json({ error: "Invalid ID format" });
        }
        const discussion = yield discussionPost_1.default.findByIdAndUpdate(objectId, { title, message, channel }, { new: true });
        if (!discussion) {
            res.status(404).json({ error: "Discussion not found" });
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
        const discussion = yield discussionPost_1.default.findByIdAndDelete(id);
        if (!discussion) {
            res.status(404).json({ error: "Discussion not found" });
        }
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
