"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReply = exports.editReply = exports.getReplies = exports.createReply = void 0;
const express_validator_1 = require("express-validator");
const validateRequestHelper_1 = require("./validateRequestHelper");
exports.createReply = [
    (0, express_validator_1.body)("postId").isMongoId().withMessage("Valid post ID is required"),
    (0, express_validator_1.body)("message").isString().notEmpty().trim().withMessage("Message is required"),
    validateRequestHelper_1.validateRequest,
];
exports.getReplies = [
    (0, express_validator_1.param)("postId").isMongoId().withMessage("Valid post ID is required"),
    validateRequestHelper_1.validateRequest,
];
exports.editReply = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("Valid reply ID is required"),
    (0, express_validator_1.body)("message").isString().notEmpty().trim().withMessage("Message is required"),
    validateRequestHelper_1.validateRequest,
];
exports.deleteReply = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("Valid reply ID is required"),
    validateRequestHelper_1.validateRequest,
];
