"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.findById = exports.getNonSensitivePatients = exports.getPatients = void 0;
const patientsFull_1 = __importDefault(require("../../data/patientsFull"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patientsFull_1.default;
};
exports.getPatients = getPatients;
const getNonSensitivePatients = () => {
    return patientsFull_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
exports.getNonSensitivePatients = getNonSensitivePatients;
const findById = (id) => {
    const entry = patientsFull_1.default.find(d => d.id === id);
    return entry;
};
exports.findById = findById;
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patientsFull_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.addPatient = addPatient;
