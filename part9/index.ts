import express from 'express';
import bmiCalculator from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;

  const parsedWeight = parseFloat(weight as string);
  const parsedHeight = parseFloat(height as string);
  

  if (!weight || !height || isNaN(parsedWeight) || isNaN(parsedHeight) ) {
    return res.status(400).json({ error: 'malformatted parameters' });
}

    const bmiResult: string = bmiCalculator(parsedWeight, parsedHeight);
    return res.json({ weight: parsedWeight, height: parsedHeight, bmi: bmiResult });
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});