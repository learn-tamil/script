import script, { granthaScript, getIso15919, getIPA, getRomanization } from './index';

describe('script tests', () => {
  it('exports scripts from json', () => {
    expect(script).toMatchSnapshot();
    expect(Array.isArray(script)).toBeTruthy();
    expect(script.length).toBe(19);
  });

  it('exports the grantha letters in the same shape as the script', () => {
    expect(granthaScript).toMatchSnapshot();
    expect(granthaScript.length).toBe(6);
    expect(granthaScript.every((row) => row.length === 13)).toBeTruthy();
    expect(granthaScript[0][0].index).toBe(script.flat().length);
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
    expect(getIPA('"";அம்!மாஜ்&&=')).toEqual('"";am!maːd͡ʑ&&=');
    expect(getIso15919('+அம்!மாஜ்--!')).toEqual('+am!māj--!');
    expect(getRomanization('+அம்!மாஜ்--!')).toEqual('+am!maaj--!');

    expect(getIPA('"";அம்!மாஜ்&&=', { grantha: false })).toEqual('"";am!maːஜ்&&=');
    expect(getIso15919('+அம்!மாஜ்--!', { grantha: false })).toEqual('+am!māஜ்--!');
    expect(getRomanization('+அம்!மாஜ்--!', { grantha: false })).toEqual('+am!maaஜ்--!');
  });

  it('keeps the grantha option apart between calls', () => {
    expect(getIso15919('ஜன்னல்')).toEqual('jaṉṉal');
    expect(getIso15919('ஜன்னல்', { grantha: false })).toEqual('ஜṉṉal');
    expect(getIso15919('ஜன்னல்')).toEqual('jaṉṉal');
    expect(getIPA('ஜன்னல்', { grantha: false })).toEqual('ஜnnal');
  });

  it('transliterates grantha letters with a vowel', () => {
    expect(getIso15919('ஜன்னல்')).toEqual('jaṉṉal');
    expect(getIPA('ஜன்னல்')).toEqual('d͡ʑannal');
    expect(getIso15919('சந்தோஷம்')).toEqual('cantōṣam');
    expect(getIPA('சந்தோஷம்')).toEqual('t͡ɕan̪toːʂam');
    expect(getIso15919('கஷ்டம்')).toEqual('kaṣṭam');
    expect(getIso15919('ஹோட்டல்')).toEqual('hōṭṭal');
    expect(getIso15919('ஸ்ரீ')).toEqual('srī');
    expect(getIso15919('பக்ஷி')).toEqual('pakṣi');
    expect(getRomanization('ஜூஸ்')).toEqual('juus');
    expect(getIso15919('ஜன்னல்', { grantha: false })).toEqual('ஜṉṉal');
  });
});
