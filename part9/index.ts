import express from 'express';
import bmiCalculator from './bmiCalculator';
import { calculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target } = req.body;
  console.log(target, typeof target);
  console.log(daily_exercises, Array.isArray(daily_exercises));

  if ( !target || !daily_exercises ) {
    return res.status(400).send({ error: 'parameters missing'});
  }

  if ( isNaN(Number(target)) || 
       !Array.isArray(daily_exercises) || 
       !daily_exercises.every((item) => typeof item === 'number') 
      ) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(target, daily_exercises);
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});