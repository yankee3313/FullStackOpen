const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
import patients from "./data/patients";

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});  

app.get('/api/patients', (_req, res) => {
  res.send(patients);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});