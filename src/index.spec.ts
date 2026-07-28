import script, { getIso15919, getIPA, getRomanization } from './index';

describe('script tests', () => {
  it('exports scripts from json', () => {
    expect(script).toMatchSnapshot();
    expect(Array.isArray(script)).toBeTruthy();
    expect(script.length).toBe(19);
  });

  it('builds the iso 15919 for word', () => {
    expect(getIso15919('அம்மா')).toEqual('ammā');
    expect(getIso15919('பாடசாலைக்கு சென்றேன்')).toEqual('pāṭacālaikku ceṉṟēṉ');
  });

  it('builds the ipa for word', () => {
    expect(getIPA('அம்மா')).toEqual('ammaː');
    expect(getIPA('பாடசாலைக்கு சென்றேன்')).toEqual('paːɖat͡ɕaːlaɪkku t͡ɕenreːn');
  });

  it('builds the romanization for word', () => {
    expect(getRomanization('அம்மா')).toEqual('ammaa');
    expect(getRomanization('பாடசாலைக்கு சென்றேன்')).toEqual('paadasaalaikku senReen');
  });

  it('keeps other characters untouched', () => {
    expect(getIPA('"";அம்!மா&&=')).toEqual('"";am!maː&&=');
    expect(getIso15919('+அம்!மா--!')).toEqual('+am!mā--!');
    expect(getRomanization('+அம்!மா--!')).toEqual('+am!maa--!');
  });

  it('takes grantha scripts into account', () => {
    expect(getIPA('"";அம்!மாஜ்&&=')).toEqual('"";am!maːஜ்&&=');
    expect(getIso15919('+அம்!மாஜ்--!')).toEqual('+am!māஜ்--!');
    expect(getRomanization('+அம்!மாஜ்--!')).toEqual('+am!maaஜ்--!');

    expect(getIPA('"";அம்!மாஜ்&&=', { grantha: true })).toEqual('"";am!maːd͡ʑ&&=');
    expect(getIso15919('+அம்!மாஜ்--!', { grantha: true })).toEqual('+am!māj--!');
    expect(getRomanization('+அம்!மாஜ்--!', { grantha: true })).toEqual('+am!maaj--!');
  });
});
