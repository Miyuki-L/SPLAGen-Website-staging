"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const directorySchema = new mongoose_1.Schema({
    userIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Directory", directorySchema);
