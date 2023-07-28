"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosisService_1 = require("../services/diagnosisService");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send((0, diagnosisService_1.getEntries)());
});
router.post('/', (_req, res) => {
    res.send((0, diagnosisService_1.addDiagnosis)());
});
exports.default = router;
