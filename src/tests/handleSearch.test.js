import { handleSearch } from '../client/js/app';

describe('search on submit', () => {
  test('It should return true', () => {
    expect(handleSearch).toBeDefined();
  });
});