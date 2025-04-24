"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editDirectoryDisplayInfo = exports.editDirectoryPersonalInformation = exports.editProfessionalInformation = exports.editPersonalInformation = exports.getUser = exports.deleteUser = exports.createUser = void 0;
const express_validator_1 = require("express-validator");
const validateRequestHelper_1 = require("./validateRequestHelper");
exports.createUser = [
    (0, express_validator_1.body)("account").notEmpty().withMessage("Account information is required"),
    (0, express_validator_1.body)("account.membership")
        .isIn(["student", "geneticCounselor", "healthcareProvider", "associate"])
        .withMessage("Invalid membership type"),
    (0, express_validator_1.body)("personal").notEmpty().withMessage("Personal information is required"),
    (0, express_validator_1.body)("personal.firstName").isString().notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("personal.lastName").isString().notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("personal.email").isEmail().withMessage("Valid email is required"),
    (0, express_validator_1.body)("personal.email").normalizeEmail(),
    (0, express_validator_1.body)("personal.phone").optional().isString().withMessage("Phone number must be a valid string"),
    (0, express_validator_1.body)("professional").optional().notEmpty().withMessage("Professional information is required"),
    (0, express_validator_1.body)("education").optional().notEmpty().withMessage("Education information is required"),
    (0, express_validator_1.body)("clinic").optional().notEmpty().withMessage("Clinic information is required"),
    (0, express_validator_1.body)("display").optional().notEmpty().withMessage("Display information is required"),
    validateRequestHelper_1.validateRequest,
];
exports.deleteUser = [
    (0, express_validator_1.param)("firebaseId").notEmpty().withMessage("Valid user ID is required"),
    validateRequestHelper_1.validateRequest,
];
exports.getUser = [
    (0, express_validator_1.param)("firebaseId").notEmpty().withMessage("Valid user ID is required"),
    validateRequestHelper_1.validateRequest,
];
exports.editPersonalInformation = [
    (0, express_validator_1.body)("newFirstName").isString().notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("newLastName").isString().notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("newEmail").isEmail().withMessage("Valid email is required"),
    (0, express_validator_1.body)("newPhone").optional().isString().withMessage("Valid phone number is required"),
    validateRequestHelper_1.validateRequest,
];
exports.editProfessionalInformation = [
    (0, express_validator_1.body)("newTitle").isString().withMessage("Title must be a string"),
    (0, express_validator_1.body)("newPrefLanguages").isArray({ min: 1 }).withMessage("Preferred languages must be an array"),
    (0, express_validator_1.body)("newPrefLanguages.*")
        .isIn(["english", "spanish", "portuguese", "other"])
        .withMessage("Invalid preferred language"),
    (0, express_validator_1.body)("newOtherPrefLanguages")
        .isString()
        .withMessage("Other preferred languages must be a string"),
    (0, express_validator_1.body)("newCountry").isString().withMessage("Country must be a string"),
    validateRequestHelper_1.validateRequest,
];
exports.editDirectoryPersonalInformation = [
    (0, express_validator_1.body)("newDegree").isString().withMessage("Degree must be a string"),
    (0, express_validator_1.body)("newEducationInstitution").isString().withMessage("Education institution is required"),
    (0, express_validator_1.body)("newClinicName").isString().withMessage("Clinic name is required"),
    (0, express_validator_1.body)("newClinicWebsiteUrl").isString().withMessage("Website must be a string"),
    (0, express_validator_1.body)("newClinicAddress").isString().withMessage("Address is required"),
    (0, express_validator_1.body)("newClinicCountry").isString().withMessage("Country is required"),
    (0, express_validator_1.body)("newClinicApartmentSuite").optional().isString(),
    (0, express_validator_1.body)("newClinicCity").optional().isString(),
    (0, express_validator_1.body)("newClinicState").optional().isString(),
    (0, express_validator_1.body)("newClinicZipPostCode").optional().isString(),
    validateRequestHelper_1.validateRequest,
];
exports.editDirectoryDisplayInfo = [
    (0, express_validator_1.body)("newWorkEmail").isEmail().withMessage("Valid work email is required"),
    (0, express_validator_1.body)("newWorkPhone").isString().withMessage("Work phone must be a string"),
    (0, express_validator_1.body)("newServices").isArray({ min: 1 }).withMessage("Services must be a non-empty array"),
    (0, express_validator_1.body)("newServices.*")
        .isIn([
        "pediatrics",
        "cardiovascular",
        "neurogenetics",
        "rareDiseases",
        "cancer",
        "biochemical",
        "prenatal",
        "adult",
        "psychiatric",
        "reproductive",
        "ophthalmic",
        "research",
        "pharmacogenomics",
        "metabolic",
        "other",
    ])
        .withMessage("Invalid service entry"),
    (0, express_validator_1.body)("newLanguages").isArray({ min: 1 }).withMessage("Languages must be a non-empty array"),
    (0, express_validator_1.body)("newLanguages.*")
        .isIn(["english", "spanish", "portuguese", "other"])
        .withMessage("Invalid language entry"),
    (0, express_validator_1.body)("newLicense").isArray().withMessage("License must be an array"),
    (0, express_validator_1.body)("newLicense.*").isString().withMessage("Each license entry must be a string"),
    (0, express_validator_1.body)("newRemoteOption").isBoolean().withMessage("Remote option must be a boolean"),
    (0, express_validator_1.body)("newRequestOption").isBoolean().withMessage("Request option must be a boolean"),
    validateRequestHelper_1.validateRequest,
];
