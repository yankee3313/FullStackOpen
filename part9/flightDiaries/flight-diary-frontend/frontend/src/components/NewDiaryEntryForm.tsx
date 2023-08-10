import React, { useState, SyntheticEvent } from 'react';
import diaryService from '../services/entries';
import { DiaryEntry, DiaryFormValues } from '../types';

interface Props {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaries: DiaryEntry[];
  }

const NewDiaryEntryForm = ({ setDiaries, diaries }: Props) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const addDiaryEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        
        try {
            const newEntryData: DiaryFormValues = {
              date,
              visibility,
              weather,
              comment,
            };
        
            const newEntry = await diaryService.create(newEntryData);
        
    
          setDiaries([...diaries, newEntry]);
    
          setDate('');
          setVisibility('');
          setWeather('');
          setComment('');
        } catch (error) {
          console.error('Error creating new diary entry:', error);
        }
      };

  return (
    <form onSubmit={addDiaryEntry}>
      <label>
        Date:
        <input
          type="text"
          name="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </label>
      <label>
        Weather:
        <input
          type="text"
          name="weather"
          value={weather}
          onChange={({ target }) => setWeather(target.value)}
        />
      </label>
      <label>
        Visibility:
        <input
          type="text"
          name="visibility"
          value={visibility}
          onChange={({ target }) => setVisibility(target.value)}
        />
      </label>
      <label>
        Comment:
        <input
          name="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
      </label>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default NewDiaryEntryForm;