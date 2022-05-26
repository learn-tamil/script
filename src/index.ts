import data from './script.json';

export type Script = {
  phonetic: string;
  name: string;
  script: string;
  iso15919: string;
  ipa: string;
};

export const script = data as Script[][];

export const getIso15919 = (phrase: string) => {
  const iso15919Map = script
    .flat()
    .reduce(
      (scripts, newScript) => ({ ...scripts, [newScript.script]: newScript.iso15919 }),
      {} as Record<string, string>,
    );

  return phrase
    .split(' ')
    .map((word) => {
      return word
        .match(/[\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?/gi)
        .map((char) => iso15919Map[char])
        .join('');
    })
    .join(' ');
};

export const getIPA = (phrase: string) => {
  const ipaMap = script
    .flat()
    .reduce((scripts, newScript) => ({ ...scripts, [newScript.script]: newScript.ipa }), {} as Record<string, string>);

  return phrase
    .split(' ')
    .map((word) => {
      return word
        .match(/[\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?/gi)
        .map((char) => ipaMap[char])
        .join('');
    })
    .join(' ');
};

export default data as Script[][];
