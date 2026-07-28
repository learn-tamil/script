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
  grantha: boolean;
};

export const script = data as Script[][];
export const granthaScript = grantha as Script[][];

const transliterate = (phrase: string, notation: 'romanization' | 'iso15919' | 'ipa', options?: Options) => {
  const notationMap = [...script, ...(options?.grantha ? grantha : [])]
    .flat()
    .reduce(
      (scripts, newScript) => ({ ...scripts, [newScript.script]: newScript[notation] }),
      {} as Record<string, string>,
    );

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
