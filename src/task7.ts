export function chunkArray<T>(items: readonly T[], chunkSize: number): T[][] {
  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new RangeError(
      `Chunk size must be a positive integer, received: ${chunkSize}`,
    );
  }

  const chunks: T[][] = [];

  for (let start = 0; start < items.length; start += chunkSize) {
    chunks.push(items.slice(start, start + chunkSize));
  }

  return chunks;
}

const numbers: readonly number[] = [1, 2, 3, 4, 5, 6, 7];
const words: readonly string[] = ["a", "b", "c", "d"];

console.log("numbers by 3:", chunkArray(numbers, 3));
console.log("words by 2:", chunkArray(words, 2));
console.log("numbers by 10:", chunkArray(numbers, 10));
console.log("empty:", chunkArray([], 3));
console.log("numbers after chunking:", numbers);

const invalidSizes = [0, -2, 1.5, NaN, Infinity];

for (const invalidSize of invalidSizes) {
  try {
    chunkArray(numbers, invalidSize);
  } catch (error) {
    if (error instanceof RangeError) {
      console.log(`RangeError: ${error.message}`);
    } else {
      throw error;
    }
  }
}
