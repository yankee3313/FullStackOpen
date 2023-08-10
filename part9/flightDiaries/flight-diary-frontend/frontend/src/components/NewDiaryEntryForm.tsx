import React, { useState, SyntheticEvent } from 'react';
import diaryService from '../services/entries';
import { DiaryEntry, DiaryFormValues, Visibility, Weather } from '../types';
import axios from 'axios';

interface Props {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaries: DiaryEntry[];
  setErrorMessage:React.Dispatch<React.SetStateAction<string>>;
  }

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

const NewDiaryEntryForm = ({ setDiaries, diaries, setErrorMessage }: Props) => {
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
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
                if (error.response?.status === 400 && error.response.data?.errors?.visibility){
                    const errorMessage = `Invalid Visibility: ${visibility}`;
                    setErrorMessage(errorMessage)
                } else if (error.response?.status === 400 && error.response.data?.errors?.weather){
                    const errorMessage = `Invalid Weather: ${weather}`;
                    setErrorMessage(errorMessage)
                } else if (error.response?.status === 400 && error.response.data?.errors?.date){
                    const errorMessage = `Invalid Date: ${date}`;
                    setErrorMessage(errorMessage)
                }
              console.log(error.status)
              console.error(error.response);
            } else {
              console.error(error);
            }
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