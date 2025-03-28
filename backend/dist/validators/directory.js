"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.denyDirectoryEntry = exports.approveDirectoryEntry = void 0;
const express_validator_1 = require("express-validator");
const validateRequestHelper_1 = require("./validateRequestHelper");
exports.approveDirectoryEntry = [
    //TODO: .isMongoId() if we end up sending mongoDB id
    (0, express_validator_1.body)("firebaseId").notEmpty().trim().withMessage("Invalid UserId"),
    validateRequestHelper_1.validateRequest,
];
exports.denyDirectoryEntry = [
    //TODO: .isMongoId() if we end up sending mongoDB id
    (0, express_validator_1.body)("firebaseId").notEmpty().trim().withMessage("Invalid UserId"),
    (0, express_validator_1.body)("reason").isString().notEmpty().trim().withMessage("Reason is required"),
    validateRequestHelper_1.validateRequest,
];
