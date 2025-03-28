"use strict";
/**
 * Initializes mongoose and express.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_errors_1 = require("http-errors");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const announcement_1 = __importDefault(require("./routes/announcement"));
const directory_1 = __importDefault(require("./routes/directory"));
const discussion_1 = __importDefault(require("./routes/discussion"));
const reply_1 = __importDefault(require("./routes/reply"));
const user_1 = __importDefault(require("./routes/user"));
// Load environment variables
dotenv_1.default.config();
// Connect to MongoDB
void mongoose_1.default
    .connect(config_1.mongoURI)
    .then(() => {
    console.log("Connected to Database.");
})
    .catch((error) => {
    if (error instanceof Error) {
        console.log(error.message);
    }
    else {
        console.log("An unknown error occurred");
    }
});
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// sets the "Access-Control-Allow-Origin" header on all responses to allow
// requests from the frontend, which has a different origin - see the following
// pages for more info:
// https://expressjs.com/en/resources/middleware/cors.html
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN,
}));
app.use("/api/announcement", announcement_1.default);
app.use("/api/users", user_1.default);
app.use("/api/discussions", discussion_1.default);
app.use("/api/replies", reply_1.default);
app.use("/api/directory", directory_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
    // 500 is the "internal server error" error code, this will be our fallback
    let statusCode = 500;
    let errorMessage = "An error has occurred.";
    // Check if the error is an instance of HttpError
    if ((0, http_errors_1.isHttpError)(error)) {
        // error.status is unique to the http error class, it allows us to pass status codes with errors
        statusCode = error.status;
        errorMessage = error.message;
    }
    // prefer custom http errors but if they don't exist, fallback to default
    else if (error instanceof Error) {
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
// Start the server
app.listen(port, () => {
    //eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
