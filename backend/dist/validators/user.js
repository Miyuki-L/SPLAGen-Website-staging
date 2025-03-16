"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.deleteUser = exports.createUser = void 0;
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
exports.createUser = [
    (0, express_validator_1.body)("name").isString().notEmpty().trim().withMessage("Name is required"),
    (0, express_validator_1.body)("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    validateRequest,
];
exports.deleteUser = [
    (0, express_validator_1.param)("id").toInt().isInt().withMessage("Valid user ID is required"),
    validateRequest,
];
exports.getUser = [
    (0, express_validator_1.param)("id").toInt().isInt().withMessage("Valid user ID is required"),
    validateRequest,
];
