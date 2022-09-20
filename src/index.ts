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

export const getIso15919 = (phrase: string, options?: Options) => {
  const iso15919Map = [...script, ...(options?.grantha ? grantha : [])]
    .flat()
    .reduce(
      (scripts, newScript) => ({ ...scripts, [newScript.script]: newScript.iso15919 }),
      {} as Record<string, string>,
    );

  return phrase
    .split(' ')
    .map((word) => {
      return word
        .match(/([\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?)|[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/gi)
        .map((char) => iso15919Map[char] || char)
        .join('');
    })
    .join(' ');
};

export const getIPA = (phrase: string, options?: Options) => {
  const ipaMap = [...script, ...(options?.grantha ? grantha : [])]
    .flat()
    .reduce((scripts, newScript) => ({ ...scripts, [newScript.script]: newScript.ipa }), {} as Record<string, string>);

  return phrase
    .split(' ')
    .map((word) => {
      return word
        .match(/([\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?)|[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/gi)
        .map((char) => ipaMap[char] || char)
        .join('');
    })
    .join(' ');
};

export default data as Script[][];
