"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));
const patients_1 = __importDefault(require("./data/patients"));
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.get('/api/patients', (_req, res) => {
    res.send(patients_1.default);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
