import { Profile } from './profile';
import { Scholar } from './scholar';

export interface ScholarProfileAssociation {
  scholar: Scholar;
  profile: Profile | null;
  accuracy: number | null;
}
