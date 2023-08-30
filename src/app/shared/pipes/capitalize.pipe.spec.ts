import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should capitalize the first letter of a string', () => {
    expect(pipe.transform('test')).toBe('Test');
    expect(pipe.transform('pokedex')).toBe('Pokedex');
  });

  it('should not modify non-string inputs', () => {
    const numbertest = 12345;
    expect(pipe.transform(numbertest)).toBe(numbertest);

    const objectTest = { key: 'test object' };
    expect(pipe.transform(objectTest)).toBe(objectTest);
  });

  it('should handle an empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return the same value if the value is not of type string', () => {
    expect(pipe.transform(null)).toBe(null);
    expect(pipe.transform(undefined)).toBe(undefined);
  });
});

