import scriptData from './script.json';

export type ScriptInfo = {
  phonetic: string;
  name: string;
  script: string;
};

const script: ScriptInfo[][] = scriptData;

export { script as default };
