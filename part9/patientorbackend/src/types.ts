export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
    patientId?: string;
  };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
  }

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[]
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;