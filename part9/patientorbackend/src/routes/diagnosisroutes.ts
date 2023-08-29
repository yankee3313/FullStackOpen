import express from 'express';
import { getDiagnoses, addDiagnosis } from "../services/diagnosisService"

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send(addDiagnosis());
});

export default router;