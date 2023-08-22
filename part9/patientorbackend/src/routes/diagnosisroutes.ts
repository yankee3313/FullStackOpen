import express from 'express';
import { getDiagnosises, addDiagnosis } from "../services/diagnosisService"

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getDiagnosises());
});

router.post('/', (_req, res) => {
  res.send(addDiagnosis());
});

export default router;