"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController = __importStar(require("../controllers/user"));
const auth_1 = require("../middleware/auth");
const UserValidator = __importStar(require("../validators/user"));
const router = express_1.default.Router();
/**
 * User directory routes
 * GET /api/users/whoami - Get current user
 * POST /api/users - Add user to directory
 * DELETE /api/users/:id - Remove user from directory
 * GET /api/users - Get all users in directory
 * GET /api/users/:id - Get specific user from directory
 */
router.get("/whoami", auth_1.requireSignedIn, UserController.getWhoAmI);
router.post("/", UserValidator.createUser, UserController.createUser);
router.delete("/:firebaseId", auth_1.requireSignedIn, auth_1.requireAdminOrSuperAdmin, UserValidator.deleteUser, UserController.deleteUser);
router.get("/", auth_1.requireSignedIn, UserController.getAllUsers);
router.get("/:firebaseId", auth_1.requireSignedIn, UserValidator.getUser, UserController.getUser);
router.post("/authenticate", auth_1.requireSignedIn, UserController.authenticateUser);
// Personal information routes
router.get("/general/personal-information", auth_1.requireSignedIn, UserController.getPersonalInformation);
router.put("/general/personal-information", auth_1.requireSignedIn, UserValidator.editPersonalInformation, UserController.editPersonalInformation);
// Professional information routes
router.put("/general/professional-information", auth_1.requireSignedIn, UserValidator.editProfessionalInformation, UserController.editProfessionalInformation);
// Directory personal information routes
router.get("/directory/personal-information", auth_1.requireSignedIn, UserController.getDirectoryPersonalInformation);
router.put("/directory/personal-information", auth_1.requireSignedIn, UserValidator.editDirectoryPersonalInformation, UserController.editDirectoryPersonalInformation);
// Directory display info routes
router.get("/directory/display-info", auth_1.requireSignedIn, UserController.getDirectoryDisplayInfo);
router.put("/directory/display-info", auth_1.requireSignedIn, UserValidator.editDirectoryDisplayInfo, UserController.editDirectoryDisplayInfo);
exports.default = router;
