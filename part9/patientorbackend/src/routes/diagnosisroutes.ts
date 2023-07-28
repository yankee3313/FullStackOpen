import express from 'express';
import { getEntries, addDiagnosis } from "../services/diagnosisService"

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getEntries());
});

router.post('/', (_req, res) => {
  res.send(addDiagnosis());
});

export default router;