import data from './script.json';

export type Script = {
  phonetic: string;
  name: string;
  script: string;
  iso15919: string;
  ipa: string;
};

export const script = data as Script[][];

export default data as Script[][];
