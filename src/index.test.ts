import script from './index';

describe('script tests', () => {
  it('exports scripts from json', () => {
    expect(script).toMatchSnapshot();
    expect(Array.isArray(script)).toBeTruthy();
    expect(script.length).toBe(19);
  });
});
