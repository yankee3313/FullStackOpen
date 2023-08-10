import React, { useState, SyntheticEvent } from 'react';
import diaryService from '../services/entries';
import { DiaryEntry, DiaryFormValues, Visibility, Weather } from '../types';
import axios from 'axios';

interface Props {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaries: DiaryEntry[];
  setErrorMessage:React.Dispatch<React.SetStateAction<string>>;
  }

const NewDiaryEntryForm = ({ setDiaries, diaries, setErrorMessage }: Props) => {
    const [date, setDate] = useState<string>('');
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
            if (axios.isAxiosError(error)) {
              setErrorMessage(error.response?.data)
            } else {
              console.log(error);
            }
          }
    };

  return (
    <form onSubmit={addDiaryEntry}>
      <label style={{display: 'block'}}>
        Date:
        <input
          type="date"
          name="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </label>
      <label style={{display: 'block'}}>
        Weather:
        <input
          type="radio"
          name="weather"
          value="sunny"
          checked={weather === 'sunny'}
          onChange={() => handleWeatherChange('sunny')}
        /> Sunny
        <input
          type="radio"
          name="weather"
          value="cloudy"
          checked={weather === 'cloudy'}
          onChange={() => handleWeatherChange('cloudy')}
        /> Cloudy
        <input
          type="radio"
          name="weather"
          value="windy"
          checked={weather === 'windy'}
          onChange={() => handleWeatherChange('windy')}
        /> Windy
        <input
          type="radio"
          name="weather"
          value="rainy"
          checked={weather === 'rainy'}
          onChange={() => handleWeatherChange('rainy')}
        /> Rainy
        <input
          type="radio"
          name="weather"
          value="stormy"
          checked={weather === 'stormy'}
          onChange={() => handleWeatherChange('stormy')}
        /> Stormy
      </label>
      <label style={{display: 'block'}}>
        Visibility:
        <input
          type="radio"
          name="visibility"
          value="great"
          checked={visibility === 'great'}
          onChange={() => handleVisibilityChange('great')}
        /> Great
        <input
          type="radio"
          name="visibility"
          value="good"
          checked={visibility === 'good'}
          onChange={() => handleVisibilityChange('good')}
        /> Good
        <input
          type="radio"
          name="visibility"
          value="ok"
          checked={visibility === 'ok'}
          onChange={() => handleVisibilityChange('ok')}
        /> Okay
        <input
          type="radio"
          name="visibility"
          value="poor"
          checked={visibility === 'poor'}
          onChange={() => handleVisibilityChange('poor')}
        /> Poor
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