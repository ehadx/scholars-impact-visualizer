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
  profile: ScholarProfile;
  accuracy: number;
}

export interface ScholarProfile {
  id: number;
  birth: ScholarDate[];
  death: ScholarDate[];
  majors: ScholarMajor[];
}

export interface ScholarMajor {
  id: number;
  name: string;
}

export interface ScholarDate {
  day: number | null;
  month: number | null;
  year: number;
  era: 'AC' | 'BC';
  accuracy: number | null;
}
