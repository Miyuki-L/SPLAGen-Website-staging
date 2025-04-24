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
exports.getUserFromMongoDB = exports.deleteUserFromMongoDB = exports.deleteUserFromFirebase = void 0;
const user_1 = __importDefault(require("../models/user"));
const firebase_1 = require("./firebase");
// delete user from Firebase
const deleteUserFromFirebase = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield firebase_1.firebaseAdminAuth.deleteUser(userId);
});
exports.deleteUserFromFirebase = deleteUserFromFirebase;
// delete user from MongoDB
const deleteUserFromMongoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteOne({ firebaseId: userId });
});
exports.deleteUserFromMongoDB = deleteUserFromMongoDB;
// get user from MongoDB
const getUserFromMongoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ firebaseId: userId });
    return user;
});
exports.getUserFromMongoDB = getUserFromMongoDB;
