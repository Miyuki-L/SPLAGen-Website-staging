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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndividualAnnouncementDetails = exports.getMultipleAnnouncements = exports.deleteAnnouncement = exports.editAnnouncement = exports.createAnnouncement = void 0;
const createAnnouncement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Create announcement route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.createAnnouncement = createAnnouncement;
const editAnnouncement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Edit announcement route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.editAnnouncement = editAnnouncement;
const deleteAnnouncement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Delete announcement route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAnnouncement = deleteAnnouncement;
const getMultipleAnnouncements = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Get multiple announcements route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.getMultipleAnnouncements = getMultipleAnnouncements;
const getIndividualAnnouncementDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Get individual announcement details route works!");
    }
    catch (error) {
        next(error);
    }
});
exports.getIndividualAnnouncementDetails = getIndividualAnnouncementDetails;
