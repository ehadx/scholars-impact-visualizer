import * as fromScholar from './scholar';
import * as fromLanguage from './language';

export namespace Domain {
  export type Scholar = fromScholar.Scholar;
  export type ScholarInfo = fromScholar.ScholarInfo;
  export type ScholarDate = fromScholar.ScholarDate;
  export type ScholarMajor = fromScholar.ScholarMajor;
  export type Language = fromLanguage.Language;
}
