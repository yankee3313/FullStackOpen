export interface DiaryEntry {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string
}

export type DiaryFormValues = Omit<DiaryEntry, "id">;

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';