import { init } from '../client/js/init';

describe('Init function', () => {
  test('It should be a function', () => {
    expect(typeof init).toBe('function');
  });
});