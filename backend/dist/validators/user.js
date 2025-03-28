"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.deleteUser = exports.createUser = void 0;
const express_validator_1 = require("express-validator");
const validateRequestHelper_1 = require("./validateRequestHelper");
exports.createUser = [
    (0, express_validator_1.body)("name").isString().notEmpty().trim().withMessage("Name is required"),
    (0, express_validator_1.body)("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    validateRequestHelper_1.validateRequest,
];
exports.deleteUser = [
    (0, express_validator_1.param)("id").toInt().isInt().withMessage("Valid user ID is required"),
    validateRequestHelper_1.validateRequest,
];
exports.getUser = [
    (0, express_validator_1.param)("id").toInt().isInt().withMessage("Valid user ID is required"),
    validateRequestHelper_1.validateRequest,
];
