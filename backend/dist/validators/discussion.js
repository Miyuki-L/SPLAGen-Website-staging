"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscussion = exports.getMultipleDiscussions = exports.deleteMultipleDiscussions = exports.deleteDiscussion = exports.editDiscussion = exports.createDiscussion = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const validateRequestHelper_1 = require("./validateRequestHelper");
exports.createDiscussion = [
    (0, express_validator_1.body)("title").isString().notEmpty().trim().withMessage("Title is required"),
    (0, express_validator_1.body)("message").isString().notEmpty().trim().withMessage("Message is required"),
    validateRequestHelper_1.validateRequest,
];
exports.editDiscussion = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid MongoDB ObjectId"),
    (0, express_validator_1.body)("title").optional().isString().trim().withMessage("Title must be a string"),
    (0, express_validator_1.body)("content").optional().isString().trim().withMessage("Content must be a string"),
    validateRequestHelper_1.validateRequest,
];
exports.deleteDiscussion = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid MongoDB ObjectId"),
    validateRequestHelper_1.validateRequest,
];
exports.deleteMultipleDiscussions = [
    (0, express_validator_1.body)("ids")
        .isArray({ min: 1 })
        .withMessage("IDs must be an array with at least one element")
        .custom((ids) => {
        if (!ids.every((id) => mongoose_1.default.Types.ObjectId.isValid(id))) {
            throw new Error("All IDs must be valid MongoDB ObjectIds");
        }
        return true;
    }),
    validateRequestHelper_1.validateRequest,
];
exports.getMultipleDiscussions = [
    (0, express_validator_1.query)("page").optional().toInt().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    (0, express_validator_1.query)("limit")
        .optional()
        .toInt()
        .isInt({ min: 1 })
        .withMessage("Limit must be a positive integer"),
    validateRequestHelper_1.validateRequest,
];
exports.getDiscussion = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid MongoDB ObjectId"),
    validateRequestHelper_1.validateRequest,
];
