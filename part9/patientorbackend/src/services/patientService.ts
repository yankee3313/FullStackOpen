import { patientData } from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

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

export const findById = (id: string): Patient | undefined => {
  const entry = patientData.find(d => d.id === id);
  return entry;
};

export const addPatient = (
  entry: NewPatientEntry
): Patient => {

  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};