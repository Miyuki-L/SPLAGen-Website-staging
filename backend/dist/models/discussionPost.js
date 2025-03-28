"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const discussionPostSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    replies: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Reply",
        },
    ],
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
        default: "everyone",
        // TODO: Add enum for channel values when valid options are defined
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("DiscussionPost", discussionPostSchema);
