"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMembership = exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["SUPERADMIN"] = "superadmin";
    UserRole["ADMIN"] = "admin";
    UserRole["MEMBER"] = "member";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserMembership;
(function (UserMembership) {
    UserMembership["STUDENT"] = "student";
    UserMembership["GENETIC_COUNSELOR"] = "geneticCounselor";
    UserMembership["HEALTHCARE_PROVIDER"] = "healthcareProvider";
    UserMembership["ASSOCIATE"] = "associate";
})(UserMembership || (exports.UserMembership = UserMembership = {}));
const userSchema = new mongoose_1.Schema({
    firebaseId: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "admin", "member"], required: true },
    account: {
        inDirectory: {
            type: mongoose_1.Schema.Types.Mixed, // Allows boolean or string
            default: false,
            validate: {
                validator: function (v) {
                    return v === true || v === false || v === "pending";
                },
                message: "Status must be true, false, or 'pending'",
            },
            required: true,
        },
        profilePicture: { type: String, default: "" },
        // can they have multiple memberships?
        membership: {
            type: String,
            enum: ["student", "geneticCounselor", "healthcareProvider", "associate"],
            required: true,
        },
    },
    personal: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
    },
    professional: {
        title: { type: String },
        prefLanguages: [{ type: String, enum: ["english", "spanish", "portuguese", "other"] }],
        otherPrefLanguages: { type: String },
        country: { type: String },
    },
    education: {
        degree: { type: String, enum: ["masters", "diploma", "fellowship", "md", "phd", "other"] },
        program: { type: String },
        otherDegree: { type: String, default: "" },
        institution: { type: String },
        email: { type: String },
        gradDate: { type: String },
    },
    associate: {
        title: { type: String },
        specialization: [
            {
                type: String,
                enum: [
                    "rare disease advocacy",
                    "research",
                    "public health",
                    "bioethics",
                    "law",
                    "biology",
                    "medical writer",
                    "medical science liason",
                    "laboratory scientist",
                    "professor",
                    "bioinformatics",
                    "biotech sales and marketing",
                ],
            },
        ],
        organization: { type: String },
    },
    clinic: {
        name: { type: String },
        url: { type: String },
        location: {
            country: { type: String },
            address: { type: String },
            suite: { type: String },
            city: { type: String },
            state: { type: String },
            zipPostCode: { type: String },
        },
    },
    display: {
        workEmail: { type: String },
        workPhone: { type: String },
        // I feel like this should not be hard-coded? Like we should have a single list elsewhere
        services: [
            {
                type: String,
                enum: [
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
                ],
            },
        ],
        languages: [{ type: String, enum: ["english", "spanish", "portuguese", "other"] }],
        license: [{ type: String }],
        options: {
            openToAppointments: { type: Boolean, default: false },
            openToRequests: { type: Boolean, default: false },
            remote: { type: Boolean, default: false },
            authorizedCare: {
                type: mongoose_1.Schema.Types.Mixed, // Allows boolean or string
                default: false,
                validate: {
                    validator: function (v) {
                        return v === true || v === false || v === "unsure";
                    },
                    message: "Status must be true, false, or 'unsure'",
                },
                required: true,
            },
        },
        comments: {
            noLicense: { type: String },
            additional: { type: String },
        },
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
