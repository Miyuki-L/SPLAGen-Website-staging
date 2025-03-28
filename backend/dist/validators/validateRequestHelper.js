"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
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
