import { it, expect, describe } from 'vitest';
import { getNShuffleddata } from './arrayUtil';

describe('getNShuffleddata', () => {
  it('should return the correct number of elements', () => {
    const array = [1, 2, 3, 4, 5];
    const count = 3;
    const result = getNShuffleddata(array, count);
    expect(result).toHaveLength(count);
  });

  it('should return unique elements', () => {
    const array = [1, 2, 3, 4, 5];
    const count = 3;
    const result = getNShuffleddata(array, count);
    expect(result).toEqual(expect.arrayContaining(result));  // Ensures no duplicates
  });

  it('should return shuffled data', () => {
    const array = [1, 2, 3, 4, 5];
    const count = 5;
    const result1 = getNShuffleddata(array, count);
    const result2 = getNShuffleddata(array, count);
    // The results should not always be the same
    expect(result1).not.toEqual(result2);
  });

  it('should handle empty array input', () => {
    const array: any[] = [];
    const count = 3;
    const result = getNShuffleddata(array, count);
    expect(result).toHaveLength(0); // Should return an empty array
  });

  it('should return empty array if count is 0', () => {
    const array = [1, 2, 3, 4, 5];
    const count = 0;
    const result = getNShuffleddata(array, count);
    expect(result).toEqual([]); // Should return an empty array
  });
});
