import express from 'express';
import { addPatient, getNonSensitivePatients, getPatients, findById } from "../services/patientService"
import toNewPatientEntry from '../utils';
import { getEntries } from "../services/diagnosisService"


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPatients());
});

router.get('/:id', (req, res) => {
  const patient = findById(req.params.id);

  if (patient) {
    const entries = getEntries(patient.id);

    const patientWithEntries = {
      ...patient,
      entries: entries
    };

    res.send(patientWithEntries);

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