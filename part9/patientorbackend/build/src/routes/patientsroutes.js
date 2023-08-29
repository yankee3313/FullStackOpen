"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send((0, patientService_1.getPatients)());
});
router.get('/:id', (req, res) => {
    const patient = (0, patientService_1.findById)(req.params.id);
    if (patient) {
        const patientWithEntries = Object.assign(Object.assign({}, patient), { entries: patient.entries || [] });
        res.send(patientWithEntries);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedEntry = (0, patientService_1.addPatient)(newPatientEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
