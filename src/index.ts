import scriptData from './script.json';

export type Script = {
  phonetic: string;
  name: string;
  script: string;
  iso15919: string;
  ipa: string;
};

const script: Script[][] = scriptData;

export { script as default };
