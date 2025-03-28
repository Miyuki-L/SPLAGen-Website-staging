"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReply = exports.editReply = exports.getReplies = exports.createReply = void 0;
const express_validator_1 = require("express-validator");
const validateRequestHelper_1 = require("./validateRequestHelper");
exports.createReply = [
    (0, express_validator_1.body)("content").isString().notEmpty().trim().withMessage("Content is required"),
    (0, express_validator_1.body)("discussionId").toInt().isInt().withMessage("Valid discussion ID is required"),
    validateRequestHelper_1.validateRequest,
];
exports.getReplies = [
    (0, express_validator_1.param)("discussionId").toInt().isInt().withMessage("Valid discussion ID is required"),
    validateRequestHelper_1.validateRequest,
];
exports.editReply = [
    (0, express_validator_1.param)("id").toInt().isInt().withMessage("Valid reply ID is required"),
    (0, express_validator_1.body)("content").isString().notEmpty().trim().withMessage("Content is required"),
    validateRequestHelper_1.validateRequest,
];
exports.deleteReply = [
    (0, express_validator_1.param)("id").toInt().isInt().withMessage("Valid reply ID is required"),
    validateRequestHelper_1.validateRequest,
];
