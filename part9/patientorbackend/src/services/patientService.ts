import patientData from '../../data/patients';
import { Patient, NonSensitivePatient } from '../../types';

export const getPatients = (): Patient[] => {
  return patientData;
};

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
id,
name,
dateOfBirth,
gender,
occupation
  }));
};

export const addPatient = () => {
  return null;
};