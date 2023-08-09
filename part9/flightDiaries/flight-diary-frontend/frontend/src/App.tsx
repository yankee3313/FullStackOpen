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
);
};

export default App;