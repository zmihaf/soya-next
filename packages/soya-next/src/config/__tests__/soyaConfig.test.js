import { stringify, raw } from '../soyaConfig';

describe('Soya Config', () => {
  it('should return raw config object', () => {
    expect(raw()).toMatchSnapshot();
  });

  it('should return stringify config', () => {
    expect(stringify()).toMatchSnapshot();
  });
});
