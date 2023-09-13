import express from 'express';
import { addPatient, getPatients, findById } from "../services/patientService"
import { toNewPatientEntry, parseDiagnosisCodes } from '../utils';
import { Patient, BaseEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPatients());
});

router.get('/:id', (req, res) => {
  const patient = findById(req.params.id);

  if (patient) {
    const patientWithEntries: Patient = {
      ...patient,
      entries: patient.entries || []
    };
    res.send(patientWithEntries);

  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = findById(req.params.id);

  if (patient && patient.entries) {

  const { date, description, specialist, type } = req.body;

  const diagnosisCodes = parseDiagnosisCodes(req.body);

  let newEntry: EntryWithoutId;

  switch (type) {
    case 'Hospital':
      const hospitalEntry: Omit<HospitalEntry, 'id'> = {
          date,
          description,
          specialist,
          diagnosisCodes,
          type,
          discharge: req.body.discharge as HospitalEntry['discharge'],
        };
        newEntry = hospitalEntry;
        break;

    case 'HealthCheck':
      const healthCheckEntry: Omit<HealthCheckEntry, 'id'> = {
        date,
        description,
        specialist,
        diagnosisCodes,
        type,
        healthCheckRating: req.body.healthCheckRating as HealthCheckEntry['healthCheckRating'],
      };
      newEntry = healthCheckEntry;
      break;

    case 'OccupationalHealthcare':
      const occupationalEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
        date,
        description,
        specialist,
        diagnosisCodes,
        type,
        employerName: req.body.employerName as OccupationalHealthcareEntry['employerName'],
        sickLeave: req.body.sickLeave as OccupationalHealthcareEntry['sickLeave'],
      };
      newEntry = occupationalEntry;
      break;

    default:
      return res.status(400).json({ error: 'Unexpected entry type' });
  }

  patient.entries.push(newEntry as any);

  return res.status(201).json(newEntry);
} 
else {
  console.log('Patient not found.');
  res.sendStatus(404);
}
});


router.post('/', (req, res) => {
  try {
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedEntry = addPatient(newPatientEntry);
  res.json(addedEntry);
}
  catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;