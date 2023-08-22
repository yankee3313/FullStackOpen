import diagnosisData from '../../data/diagnoses';
import { Diagnosis, Entry } from '../types';

export const getEntries = (patientId: string): Entry[] => {
  const allDiagnoses: Diagnosis[] = diagnosisData;

  const entriesForPatient = allDiagnoses.filter(diagnosis => diagnosis.patientId === patientId);
  
  return entriesForPatient;
};

export const getDiagnosises = (): Diagnosis[] => {
  return diagnosisData;
};

export const addDiagnosis = () => {
  return null;
};