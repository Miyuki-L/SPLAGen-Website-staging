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
exports.sendDirectoryDenialEmail = exports.sendDirectoryApprovalEmail = void 0;
const dotenv_1 = require("dotenv");
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailHtml_1 = require("./emailHtml");
(0, dotenv_1.config)();
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail", // You can change this if you're using another provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    const mailOptions = Object.assign({ from: process.env.EMAIL_USER }, options);
    try {
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
});
const sendDirectoryApprovalEmail = (to, name) => __awaiter(void 0, void 0, void 0, function* () {
    const emailSubject = "Welcome to the SPLAGen Directory!";
    const emailHTML = emailHtml_1.DIRECTORY_APPROVAL_EMAIL.replace(emailHtml_1.RECIPIENT_TEXT, name) + emailHtml_1.SIGN_OFF_HTML;
    yield sendEmail({
        to,
        subject: emailSubject,
        html: emailHTML,
        attachments: [
            {
                filename: "splagen_logo.png",
                path: `${__dirname}/../../public/splagen_logo.png`,
                cid: "splagen_logo.png",
            },
        ],
    });
});
exports.sendDirectoryApprovalEmail = sendDirectoryApprovalEmail;
const sendDirectoryDenialEmail = (to, name, reason) => __awaiter(void 0, void 0, void 0, function* () {
    const emailSubject = "Update on your SPLAGen Directory Application!";
    const emailHTML = emailHtml_1.DIRECTORY_DENIAL_EMAIL.replace(emailHtml_1.RECIPIENT_TEXT, name).replace(emailHtml_1.REASON_TEXT, reason) +
        emailHtml_1.SIGN_OFF_HTML;
    yield sendEmail({
        to,
        subject: emailSubject,
        html: emailHTML,
        attachments: [
            {
                filename: "splagen_logo.png",
                path: `${__dirname}/../../public/splagen_logo.png`,
                cid: "splagen_logo.png",
            },
        ],
    });
});
exports.sendDirectoryDenialEmail = sendDirectoryDenialEmail;
