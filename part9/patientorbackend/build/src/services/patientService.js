"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.getNonSensitivePatients = exports.getPatients = void 0;
const patients_1 = __importDefault(require("../../data/patients"));
const getPatients = () => {
    return patients_1.default;
};
exports.getPatients = getPatients;
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
exports.getNonSensitivePatients = getNonSensitivePatients;
const addPatient = () => {
    return null;
};
exports.addPatient = addPatient;
