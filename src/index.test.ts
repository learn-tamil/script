import script, { getIso15919 } from './index';

describe('script tests', () => {
  it('exports scripts from json', () => {
    expect(script).toMatchSnapshot();
    expect(Array.isArray(script)).toBeTruthy();
    expect(script.length).toBe(19);
  });

  it('builds the iso 15919 for word', () => {
    expect(getIso15919('அம்மா')).toEqual('ammā');
  });
});
