const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
const patients = require("./data/patients");
const diagnosesRouter = require('./src/routes/diagnosisroutes').default;

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});  

app.use('/api/patients', (_req, res) => {
  res.send(patients);
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});