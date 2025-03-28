"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editDirectoryDisplayInfo = exports.getDirectoryDisplayInfo = exports.editDirectoryPersonalInformation = exports.getDirectoryPersonalInformation = exports.editProfessionalInformation = exports.getProfessionalInformation = exports.editPersonalInformation = exports.getPersonalInformation = exports.getUser = exports.getAllUsers = exports.deleteUser = exports.createUser = exports.getWhoAmI = exports.users = void 0;
const user_1 = __importDefault(require("../models/user"));
exports.users = [];
/**
 * Retrieves data about the current user (their MongoDB ID, Firebase UID, and role, personal object).
 * Requires the user to be signed in.
 */
const getWhoAmI = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const user = yield user_1.default.findOne({ firebaseId: firebaseUid });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const { _id, firebaseId, role, personal } = user;
        res.status(200).send({
            _id,
            firebaseId,
            role,
            personal,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getWhoAmI = getWhoAmI;
const createUser = (req, res) => {
    try {
        const { name, email, accountType } = req.body;
        if (!name || !email) {
            res.status(400).json({ error: "Name and email are required" });
            return;
        }
        const newUser = {
            id: exports.users.length + 1,
            name,
            email,
            accountType,
        };
        exports.users.push(newUser);
        res.status(201).json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createUser = createUser;
const deleteUser = (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Valid user ID is required" });
            return;
        }
        const index = exports.users.findIndex((user) => user.id === id);
        if (index === -1) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        exports.users.splice(index, 1);
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteUser = deleteUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_1.default.find();
        res.status(200).json({ allUsers });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Valid user ID is required" });
            return;
        }
        const user = exports.users.find((u) => u.id === id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getUser = getUser;
const getPersonalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Get personal information route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.getPersonalInformation = getPersonalInformation;
const editPersonalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Edit personal information route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.editPersonalInformation = editPersonalInformation;
const getProfessionalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Get professional information route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.getProfessionalInformation = getProfessionalInformation;
const editProfessionalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Edit professional information route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.editProfessionalInformation = editProfessionalInformation;
const getDirectoryPersonalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Get directory personal information route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.getDirectoryPersonalInformation = getDirectoryPersonalInformation;
const editDirectoryPersonalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Edit directory personal information route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.editDirectoryPersonalInformation = editDirectoryPersonalInformation;
const getDirectoryDisplayInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("get directory display information route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.getDirectoryDisplayInfo = getDirectoryDisplayInfo;
const editDirectoryDisplayInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Edit directory display information route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.editDirectoryDisplayInfo = editDirectoryDisplayInfo;
