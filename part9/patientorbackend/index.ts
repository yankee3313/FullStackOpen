import express from 'express';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
    // Fetch the patients data from your data source or database
    const patients = ...; // Fetch patients from the data source
  
    // Send the patients data as the response
    res.json(patients);
  });
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});