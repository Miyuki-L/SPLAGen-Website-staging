"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReply = exports.editReply = exports.getReplies = exports.createReply = void 0;
const express_validator_1 = require("express-validator");
function validateRequest(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorList = errors.array();
        res.status(400).json({ errors: errorList });
        return;
    }
    next();
}
exports.createReply = [
    (0, express_validator_1.body)("content").isString().notEmpty().trim().withMessage("Content is required"),
    (0, express_validator_1.body)("discussionId").toInt().isInt().withMessage("Valid discussion ID is required"),
    validateRequest,
];
exports.getReplies = [
    (0, express_validator_1.param)("discussionId").toInt().isInt().withMessage("Valid discussion ID is required"),
    validateRequest,
];
exports.editReply = [
    (0, express_validator_1.param)("id").toInt().isInt().withMessage("Valid reply ID is required"),
    (0, express_validator_1.body)("content").isString().notEmpty().trim().withMessage("Content is required"),
    validateRequest,
];
exports.deleteReply = [
    (0, express_validator_1.param)("id").toInt().isInt().withMessage("Valid reply ID is required"),
    validateRequest,
];
