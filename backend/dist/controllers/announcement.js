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
exports.getIndividualAnnouncementDetails = exports.getMultipleAnnouncements = exports.deleteAnnouncement = exports.editAnnouncement = exports.createAnnouncement = void 0;
const announcement_1 = __importDefault(require("../models/announcement"));
const user_1 = require("../models/user");
const createAnnouncement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, message, recipients } = req.body;
        const userId = req.mongoID;
        const newAnnouncement = new announcement_1.default({ userId, title, message, recipients });
        yield newAnnouncement.save();
        res
            .status(201)
            .json({ message: "Announcement created successfully", announcement: newAnnouncement });
    }
    catch (error) {
        next(error);
    }
});
exports.createAnnouncement = createAnnouncement;
const editAnnouncement = (req, res, next) => {
    try {
        res.status(200).send("Edit announcement route works!");
    }
    catch (error) {
        next(error);
    }
};
exports.editAnnouncement = editAnnouncement;
const deleteAnnouncement = (req, res, next) => {
    try {
        res.status(200).send("Delete announcement route works!");
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAnnouncement = deleteAnnouncement;
const getMultipleAnnouncements = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRole = req.role;
        const userEmail = req.userEmail;
        let query = {};
        if (![user_1.UserRole.ADMIN, user_1.UserRole.SUPERADMIN].includes(userRole)) {
            // If the user is not an admin or super admin, filter announcements by their email
            query = { recipients: { $in: [userEmail, "everyone"] } };
        }
        const announcements = yield announcement_1.default.find(query);
        res.status(200).json({ announcements });
    }
    catch (error) {
        next(error);
    }
});
exports.getMultipleAnnouncements = getMultipleAnnouncements;
const getIndividualAnnouncementDetails = (req, res, next) => {
    try {
        //TODO: validate that the user is allowed to see the announcement
        res.status(200).send("Get individual announcement details route works!");
    }
    catch (error) {
        next(error);
    }
};
exports.getIndividualAnnouncementDetails = getIndividualAnnouncementDetails;
