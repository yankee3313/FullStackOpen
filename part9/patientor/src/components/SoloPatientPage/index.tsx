import { Patient, Gender, BaseEntry, Diagnosis, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    patients : Patient[]
    diagnoses: Diagnosis[]
  }

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const getHeartColor = (rating: number): JSX.Element => {
  switch (rating) {
      case 0:
        return <FavoriteIcon style={{ color: "green" }} />;
      case 1:
        return <FavoriteIcon style={{ color: "orange" }} />;
      case 2:
        return <FavoriteIcon style={{ color: "red" }} />;
      default:
        return <FavoriteIcon style={{ color: "green" }} />;
  }
};

const EntryDetails: React.FC<{ entry: BaseEntry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
      case "Hospital":
        const hospitalEntry = entry as HospitalEntry;
          return (
              <div>
                <p>Discharge: {hospitalEntry.discharge.date}</p>
                <p>{hospitalEntry.discharge.criteria}</p>
              </div>
          );
      case "HealthCheck":
        const healthCheckEntry = entry as HealthCheckEntry;
          return (
              <div>
                <p>Health Check Rating: {getHeartColor(healthCheckEntry.healthCheckRating)}</p>
              </div>
          );
      case "OccupationalHealthcare":
        const occupationalEntry = entry as OccupationalHealthcareEntry;
          return (
              <div>
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
                <p>Employer: {occupationalEntry.employerName}</p>
                  {occupationalEntry.sickLeave && (
                    <div>
                      <p>Sick Leave Start: {occupationalEntry.sickLeave.startDate}</p>
                      <p>Sick Leave End: {occupationalEntry.sickLeave.endDate}</p>
                    </div>
                  )}
              </div>
          );
      default:
        return assertNever(entry);
  }
};

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
        <div>{patient.entries ? (
                patient.entries.map((entry: BaseEntry, index: number) => (
                    <div key={index} style={{border: '1px solid black', margin: '5px'}}>
                        <p><strong>{entry.date}:</strong></p>
                        <p><i>{entry.description}</i></p>
                        <EntryDetails entry={entry} diagnoses={diagnoses} />
                        <p><strong>Diagnosis by {entry.specialist}</strong></p>
                    </div>
                ))
            ) : (
                <p>No entries available</p>
            )}
            </div>
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