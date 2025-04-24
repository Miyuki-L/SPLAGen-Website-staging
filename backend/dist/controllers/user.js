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
exports.editDirectoryDisplayInfo = exports.getDirectoryDisplayInfo = exports.editDirectoryPersonalInformation = exports.getDirectoryPersonalInformation = exports.editProfessionalInformation = exports.getProfessionalInformation = exports.editPersonalInformation = exports.getPersonalInformation = exports.getUser = exports.getAllUsers = exports.deleteUser = exports.getWhoAmI = exports.authenticateUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const firebase_1 = require("../util/firebase");
const user_2 = require("../util/user");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { account, personal, professional, education, associate, password } = req.body;
        // Create user in Firebase
        const userRecord = yield firebase_1.firebaseAdminAuth.createUser({
            email: personal.email,
            password,
        });
        // Create new user in MongoDB
        const newUser = yield user_1.default.create({
            firebaseId: userRecord.uid,
            role: "member",
            account: Object.assign(Object.assign({}, account), { inDirectory: false }),
            personal,
            professional,
            education,
            associate,
        });
        res.status(201).json(newUser);
        return;
    }
    catch (error) {
        console.error("Error creating user:", error);
        next(error);
        return;
    }
});
exports.createUser = createUser;
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { firebaseUid } = req;
        // Fetch user from MongoDB using firebaseUid (firebaseUid should already be added by requireSignedIn)
        const user = yield user_1.default.findOne({ firebaseId: firebaseUid });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({
            firebaseId: firebaseUid,
            role: user.role,
            personal: user.personal,
            email: (_a = user.personal) === null || _a === void 0 ? void 0 : _a.email,
        });
        return;
    }
    catch (error) {
        console.error("Error during user authentication:", error);
        next(error);
        return;
    }
});
exports.authenticateUser = authenticateUser;
const getWhoAmI = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const user = yield user_1.default.findOne({ firebaseId: firebaseUid });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({
            firebaseId: user.firebaseId,
            role: user.role,
            personal: user.personal,
        });
        return;
    }
    catch (error) {
        next(error);
        return;
    }
});
exports.getWhoAmI = getWhoAmI;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseId } = req.params;
        // Delete user from Firebase and MongoDB
        yield (0, user_2.deleteUserFromFirebase)(firebaseId);
        yield (0, user_2.deleteUserFromMongoDB)(firebaseId);
        res.status(200).json({ message: "User deleted successfully" });
        return;
    }
    catch (error) {
        console.error("Error deleting user:", error);
        next(error);
        return;
    }
});
exports.deleteUser = deleteUser;
const getAllUsers = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({}).exec();
        res.status(200).json({ users });
        return;
    }
    catch (error) {
        console.error("Error getting users:", error);
        next(error);
        return;
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseId } = req.params;
        const user = yield (0, user_2.getUserFromMongoDB)(firebaseId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (error) {
        console.error("Error getting user:", error);
        next(error);
        return;
    }
});
exports.getUser = getUser;
const getPersonalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const user = yield user_1.default.findOne({ firebaseId: firebaseUid });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user.personal);
        return;
    }
    catch (error) {
        console.error("Error fetching personal information:", error);
        next(error);
        return;
    }
});
exports.getPersonalInformation = getPersonalInformation;
const editPersonalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const { newFirstName, newLastName, newEmail, newPhone } = req.body;
        const updatedUser = yield user_1.default.findOneAndUpdate({ firebaseId: firebaseUid }, {
            "personal.firstName": newFirstName,
            "personal.lastName": newLastName,
            "personal.email": newEmail,
            "personal.phone": newPhone,
        }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Personal information updated", personal: updatedUser.personal });
        return;
    }
    catch (error) {
        console.error("Error updating personal information:", error);
        next(error);
        return;
    }
});
exports.editPersonalInformation = editPersonalInformation;
const getProfessionalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const user = yield user_1.default.findOne({ firebaseId: firebaseUid });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user.professional);
        return;
    }
    catch (error) {
        console.error("Error fetching professional information:", error);
        next(error);
        return;
    }
});
exports.getProfessionalInformation = getProfessionalInformation;
const editProfessionalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const { newTitle, newPrefLanguages, newOtherPrefLanguages, newCountry } = req.body;
        const updatedUser = yield user_1.default.findOneAndUpdate({ firebaseId: firebaseUid }, {
            "professional.title": newTitle,
            "professional.prefLanguages": newPrefLanguages,
            "professional.otherPrefLanguages": newOtherPrefLanguages,
            "professional.country": newCountry,
        }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({
            message: "Professional information updated",
            professional: updatedUser.professional,
        });
        return;
    }
    catch (error) {
        console.error("Error updating professional information:", error);
        next(error);
        return;
    }
});
exports.editProfessionalInformation = editProfessionalInformation;
const getDirectoryPersonalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const user = yield user_1.default.findOne({ firebaseId: firebaseUid });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        // Combine education and clinic fields for directory information
        res.status(200).json(Object.assign(Object.assign({}, user.education), user.clinic));
        return;
    }
    catch (error) {
        console.error("Error fetching directory personal information:", error);
        next(error);
        return;
    }
});
exports.getDirectoryPersonalInformation = getDirectoryPersonalInformation;
const editDirectoryPersonalInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const { newDegree, newEducationInstitution, newClinicName, newClinicWebsiteUrl, newClinicAddress, newClinicCountry, newClinicApartmentSuite, newClinicCity, newClinicState, newClinicZipPostCode, } = req.body;
        const updatedUser = yield user_1.default.findOneAndUpdate({ firebaseId: firebaseUid }, {
            "education.degree": newDegree,
            "education.institution": newEducationInstitution,
            "clinic.name": newClinicName,
            "clinic.url": newClinicWebsiteUrl,
            "clinic.location.address": newClinicAddress,
            "clinic.location.country": newClinicCountry,
            "clinic.location.suite": newClinicApartmentSuite,
            "clinic.location.city": newClinicCity,
            "clinic.location.state": newClinicState,
            "clinic.location.zipCode": newClinicZipPostCode,
        }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({
            message: "Directory personal information updated",
            directoryInfo: Object.assign(Object.assign({}, updatedUser.education), updatedUser.clinic),
        });
        return;
    }
    catch (error) {
        console.error("Error updating directory personal information:", error);
        next(error);
        return;
    }
});
exports.editDirectoryPersonalInformation = editDirectoryPersonalInformation;
const getDirectoryDisplayInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const user = yield user_1.default.findOne({ firebaseId: firebaseUid });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user.display);
        return;
    }
    catch (error) {
        console.error("Error fetching directory display information:", error);
        next(error);
        return;
    }
});
exports.getDirectoryDisplayInfo = getDirectoryDisplayInfo;
const editDirectoryDisplayInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firebaseUid } = req;
        const { newWorkEmail, newWorkPhone, newServices, newLanguages, newLicense, newRemoteOption, newRequestOption, } = req.body;
        const updatedUser = yield user_1.default.findOneAndUpdate({ firebaseId: firebaseUid }, {
            "display.workEmail": newWorkEmail,
            "display.workPhone": newWorkPhone,
            "display.services": newServices,
            "display.languages": newLanguages,
            "display.license": newLicense,
            "display.options.remote": newRemoteOption,
            "display.options.openToRequests": newRequestOption,
        }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Directory display information updated", display: updatedUser.display });
        return;
    }
    catch (error) {
        console.error("Error updating directory display information:", error);
        next(error);
        return;
    }
});
exports.editDirectoryDisplayInfo = editDirectoryDisplayInfo;
