"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "./../.env") });
const app = (0, express_1.default)();
app.use("/", (req, res) => {
    res.send("ping-pong");
});
app.post("/upload", (req, res) => {
    console.log(req.body);
    res.json({ body: req.body });
});
app.listen(process.env.PORT, () => {
    console.log(`[${new Date()}] : server started running on port ${process.env.PORT}`);
});
