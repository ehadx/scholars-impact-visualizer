import { Country } from './country';
import { Major } from './major';
import { ScholarDate } from './scholar';

export interface Profile {
  id: number;
  countries: Country[];
  dates: ScholarDate[];
  majors: Major[];
}
