"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnnouncement = void 0;
const express_validator_1 = require("express-validator");
const validateRequestHelper_1 = require("./validateRequestHelper");
exports.createAnnouncement = [
    (0, express_validator_1.body)("title").isString().notEmpty().trim().withMessage("Title is required"),
    (0, express_validator_1.body)("message").isString().notEmpty().trim().withMessage("Message text is required"),
    (0, express_validator_1.body)("recipients")
        .custom((value) => {
        if (typeof value === "string") {
            return value === "everyone";
        }
        if (Array.isArray(value)) {
            return value.every((email) => typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email));
        }
        return false;
    })
        .withMessage("Channel must be 'everyone' or an array of valid email addresses."),
    validateRequestHelper_1.validateRequest,
];
