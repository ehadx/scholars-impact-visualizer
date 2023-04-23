import { Profile } from './profile';
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

export interface ScholarProfileAssociation {
  profile: Profile;
  accuracy: number;
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
