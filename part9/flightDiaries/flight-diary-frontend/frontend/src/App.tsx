import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "./utils";

import { DiaryEntry } from "./types";

import diaryService from "./services/entries";
import NewDiaryEntryForm from "./components/NewDiaryEntryForm"
import DiaryList from "./components/DiaryList"
import ErrorMessage from "./components/ErrorMessage"

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
      <h1>Add New Diary Entry</h1>
      <ErrorMessage errorMessage={errorMessage}/>
      <NewDiaryEntryForm setDiaries={setDiaries} diaries={diaries}
        setErrorMessage={setErrorMessage}/>
      <h1>Diary Entries</h1>
      <DiaryList diaries={diaries}/>
    </div>
  );
};

export default App;