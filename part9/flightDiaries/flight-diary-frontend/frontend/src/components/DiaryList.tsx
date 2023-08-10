import { DiaryEntry } from '../types';

interface Props {
    diaries: DiaryEntry[];
    }
  
const DiaryList = ({ diaries }: Props) => {

return (<ul>
{diaries.map((entry: DiaryEntry) => (
  <li key={entry.id}>
    <h2>{entry.date}</h2>
    <p>Weather: {entry.weather}</p>
    <p>Visibility: {entry.visibility}</p>
    <p>Comment: {entry.comment}</p>
  </li>
))}
</ul>
);
};
export default DiaryList;