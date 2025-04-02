"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const announcementSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    recipients: {
        type: mongoose_1.Schema.Types.Mixed, // Allows either a string or an array
        required: true,
        default: "everyone",
        validate: {
            validator: function (value) {
                if (typeof value === "string") {
                    return value === "everyone";
                }
                if (Array.isArray(value)) {
                    return value.every((email) => typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email));
                }
                return false;
            },
            message: "Channel must be 'everyone' or an array of valid email addresses.",
        },
    },
    message: { type: String, required: true },
}, 
// files: [{ type: String }],
// commentsAllowed: { type: Boolean, required: true },
// comments: [{ type: Schema.Types.ObjectId, ref: "AnnouncementComment" }],
{ timestamps: true });
exports.default = (0, mongoose_1.model)("Announcement", announcementSchema);
