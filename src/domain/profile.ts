import { ScholarProfileAssociation } from './associations';
import { Country } from './country';
import { Major } from './major';
import { ScholarDate } from './scholar';

export interface Profile {
  id: number;
  title: string;
  countries: ProfileCountry[];
  dates: ScholarDate[];
  majors: ProfileMajor[];
  syncNation: string;
  additionalNotes: string;
  school: string;
  informationalFootprint: string;
  profileAssociations: ScholarProfileAssociation[];
}

export interface ProfileCountry {
  country: Country;
  note: string | null;
}

export interface ProfileMajor {
  major: Major;
  reference: string;
}

export function defaultProfile(): Profile {
  return {
    id: 0,
    title: '',
    countries: [],
    dates: [],
    majors: [],
    syncNation: '',
    additionalNotes: '',
    school: '',
    profileAssociations: [],
    informationalFootprint: '',
  };
}
