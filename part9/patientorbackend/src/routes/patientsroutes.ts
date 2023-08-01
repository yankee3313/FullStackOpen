import express from 'express';
import { getPatients, addPatient, getNonSensitivePatients, findById } from "../services/patientService"
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
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