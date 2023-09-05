export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
  patientId?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
id: string;
description: string;
date: string;
specialist: string;
diagnosisCodes?: Array<Diagnosis['code']>;
type: string;
};

export interface SickLeave {
startDate: string;
endDate: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
type: "OccupationalHealthcare";
employerName: string;
sickLeave: SickLeave;
};

export interface Discharge {
date: string;
criteria: string;
};

export interface HospitalEntry extends BaseEntry {
type: "Hospital";
discharge: Discharge;
};

export enum HealthCheckRating {
"Healthy" = 0,
"LowRisk" = 1,
"HighRisk" = 2,
"CriticalRisk" = 3
};

export interface HealthCheckEntry extends BaseEntry {
type: "HealthCheck";
healthCheckRating: HealthCheckRating;
};

export interface Patient {
id: string;
name: string;
occupation: string;
gender: string;
ssn?: string;
dateOfBirth?: string;
entries?: Array<BaseEntry | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry>;
};

export enum Gender {
Male = 'male',
Female = 'female',
Other = 'other'
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;