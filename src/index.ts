import data from './script.json';
import grantha from './grantha.json';

export type Script = {
  index: number;
  romanization: string;
  name: string;
  script: string;
  iso15919: string;
  ipa: string;
};

export type Options = {
  grantha?: boolean;
};

export const script = data as Script[][];
export const granthaScript = grantha as Script[][];

type Notation = 'romanization' | 'iso15919' | 'ipa';

const notationMaps = new Map<string, Record<string, string>>();

const getNotationMap = (notation: Notation, withGrantha: boolean) => {
  const key = `${notation}:${withGrantha}`;
  let notationMap = notationMaps.get(key);
  if (!notationMap) {
    notationMap = Object.fromEntries(
      [...script, ...(withGrantha ? grantha : [])].flat().map((letter) => [letter.script, letter[notation]]),
    );
    notationMaps.set(key, notationMap);
  }
  return notationMap;
};

const transliterate = (phrase: string, notation: Notation, options?: Options) => {
  const notationMap = getNotationMap(notation, options?.grantha !== false);

  return phrase
    .split(' ')
    .map((word) => {
      return (
        word.match(/([\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?)|[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/gi) ?? [word]
      )
        .map((char) => notationMap[char] || char)
        .join('');
    })
    .join(' ');
};

export const getIso15919 = (phrase: string, options?: Options) => transliterate(phrase, 'iso15919', options);

export const getIPA = (phrase: string, options?: Options) => transliterate(phrase, 'ipa', options);

export const getRomanization = (phrase: string, options?: Options) => transliterate(phrase, 'romanization', options);

export default data as Script[][];
