"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const announcementSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    message: {
        title: { type: String, required: true },
        channel: { type: String, required: true, default: "everyone" },
        // text as markdown?
        text: { type: String, required: true },
    },
    //Files should be urls?
    files: [{ type: String }],
    commentsAllowed: { type: Boolean, required: true },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "AnnouncementComment" }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Announcement", announcementSchema);
