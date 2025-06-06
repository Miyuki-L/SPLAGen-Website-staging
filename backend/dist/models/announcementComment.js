"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const announcementComment = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    announcementId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Announcement" },
    message: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("AnnouncementComment", announcementComment);
