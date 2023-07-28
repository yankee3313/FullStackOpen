import express from 'express';
import { getPatients, addPatient, getNonSensitivePatients } from "../services/patientService"

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post('/', (_req, res) => {
  res.send(addPatient());
});

export default router;