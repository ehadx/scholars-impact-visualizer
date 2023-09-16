import { Language } from './language';

export interface Scholar {
  id: number;
  lang: Language;
  name: string;
}

export interface ScholarInfo {
  lang: Language;
  name: String;
}

export type ScholarDateType = 'birth' | 'death';
export type ScholarDateEra = 'AC' | 'BC';

export interface ScholarDate {
  day: number | null;
  month: number | null;
  year: number;
  era: ScholarDateEra;
  type: ScholarDateType;
  accuracy: number | null;
}
