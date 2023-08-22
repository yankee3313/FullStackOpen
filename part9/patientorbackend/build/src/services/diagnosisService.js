"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDiagnosis = exports.getDiagnosises = exports.getEntries = void 0;
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const getEntries = (patientId) => {
    const allDiagnoses = diagnoses_1.default;
    const entriesForPatient = allDiagnoses.filter(diagnosis => diagnosis.patientId === patientId);
    return entriesForPatient;
};
exports.getEntries = getEntries;
const getDiagnosises = () => {
    return diagnoses_1.default;
};
exports.getDiagnosises = getDiagnosises;
const addDiagnosis = () => {
    return null;
};
exports.addDiagnosis = addDiagnosis;
