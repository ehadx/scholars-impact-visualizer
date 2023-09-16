import * as fromScholar from './scholar';
import * as fromLanguage from './language';
import * as fromCountry from './country';
import * as fromMajor from './major';
import * as fromProfile from './profile';
import * as fromAssociations from './associations';

export namespace Domain {
  export type Scholar = fromScholar.Scholar;
  export type ScholarInfo = fromScholar.ScholarInfo;
  export type ScholarDateEra = fromScholar.ScholarDateEra;
  export type ScholarDateType = fromScholar.ScholarDateType;
  export type ScholarDate = fromScholar.ScholarDate;
  export type Major = fromMajor.Major;
  export type Language = fromLanguage.Language;
  export type Country = fromCountry.Country;
  export type Profile = fromProfile.Profile;
  export type ProfileCountry = fromProfile.ProfileCountry;
  export type ProfileMajor = fromProfile.ProfileMajor;
  export type ScholarProfileAssociation =
    fromAssociations.ScholarProfileAssociation;
}

export namespace Defaults {
  export const profile = fromProfile.defaultProfile;
}
