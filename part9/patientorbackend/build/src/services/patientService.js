"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.findById = exports.getNonSensitivePatients = exports.getPatients = void 0;
const patients_1 = require("../../data/patients");
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.patientData;
};
exports.getPatients = getPatients;
const getNonSensitivePatients = () => {
    return patients_1.patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
exports.getNonSensitivePatients = getNonSensitivePatients;
const findById = (id) => {
    const entry = patients_1.patientData.find(d => d.id === id);
    return entry;
};
exports.findById = findById;
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.patientData.push(newPatientEntry);
    return newPatientEntry;
};
exports.addPatient = addPatient;
