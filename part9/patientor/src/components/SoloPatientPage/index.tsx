import { Patient, Gender, BaseEntry, Diagnosis } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useParams } from 'react-router-dom';

interface Props {
    patients : Patient[]
    diagnoses: Diagnosis[]
  }

const SoloPatientPage = ({ patients, diagnoses } : Props ) => {
  const { id } = useParams<{ id: string }>();

  const patient = patients.find(p => p.id === id);

  if (patient) {
    return (
      <div>
        <h1>
          {patient.name} {patient.gender === Gender.Male ? <MaleIcon /> :
           patient.gender === Gender.Female ? <FemaleIcon /> : null}
        </h1>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h1>entries:</h1>        
        {patient.entries ? (
                patient.entries.map((entry: BaseEntry, index: number) => (
                    <div key={index}>
                        <p>{entry.date}:</p>
                        <p><i>{entry.description}</i></p>
                        {entry.diagnosisCodes ? (
                            <ul>
                            {entry.diagnosisCodes.map((code: string, index: number) => {
                                const diagnosis = diagnoses.find(d => d.code === code);
                                return (
                                    <li key={index}>
                                        {code} - {diagnosis ? diagnosis.name : "Diagnosis not found"}
                                    </li>
                                );
                            })}
                        </ul>

                        ) : (
                            <p></p>
                        )}
                    </div>
                ))
            ) : (
                <p>No entries available</p>
            )}
            </div>
          )
  }
  else {
    return (
      <div>
        <p>Patient not found.</p>
      </div>
    );
  }
};

export default SoloPatientPage;