import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "./utils";

import { DiaryEntry } from "./types";

import diaryService from "./services/entries";


const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaryList();
  }, []);

  return (
    <div className='App'>
      <h1>Diary Entries</h1>
      <ul>
      {diaries.map((entry: DiaryEntry) => (
        <li key={entry.id}>
          <h2>{entry.date}</h2>
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
          <p>Comments: {entry.comment}</p>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default App;