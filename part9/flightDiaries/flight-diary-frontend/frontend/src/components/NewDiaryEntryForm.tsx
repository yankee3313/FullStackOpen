import React, { useState, SyntheticEvent } from 'react';
import diaryService from '../services/entries';
import { DiaryEntry, DiaryFormValues, Visibility, Weather } from '../types';

interface Props {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaries: DiaryEntry[];
  }

const NewDiaryEntryForm = ({ setDiaries, diaries }: Props) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState<Visibility>('great');
    const [weather, setWeather] = useState<Weather>('sunny');
    const [comment, setComment] = useState('');

    const handleVisibilityChange = (value: string) => {
        setVisibility(value as Visibility);
      };
    
    const handleWeatherChange = (value: string) => {
    setWeather(value as Weather);
    };

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
          setVisibility('great');
          setWeather('sunny');
          setComment('');
        } catch (error) {
          console.error('Error creating new diary entry:', error);
        }
      };

  return (
    <form onSubmit={addDiaryEntry}>
      <label style={{display: 'block'}}>
        Date:
        <input
          type="text"
          name="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </label>
      <label style={{display: 'block'}}>
        Weather:
        <input
          type="text"
          name="weather"
          value={weather}
          onChange={({ target }) => handleWeatherChange(target.value)}
        />
      </label>
      <label style={{display: 'block'}}>
        Visibility:
        <input
          type="text"
          name="visibility"
          value={visibility}
          onChange={({ target }) => handleVisibilityChange(target.value)}
        />
      </label>
      <label style={{display: 'block'}}>
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