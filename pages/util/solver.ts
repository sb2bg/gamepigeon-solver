export const solveAnagrams = async (letters: string): Promise<string[]> => {
  const words = new Set(
    await fetch("words.txt")
      .then((r) => r.text())
      .then((r) => r.split(/\s+/))
  );

  const result: Set<string> = new Set();

  const recursiveHelper = async (letters: string, curr: string) => {
    if (words.has(curr.toUpperCase())) {
      result.add(curr);
    }

    if (letters.length === 0) {
      return;
    }

    for (let i = 0; i < letters.length; i++) {
      recursiveHelper(
        letters.slice(0, i) + letters.slice(i + 1),
        curr + letters[i]
      );
    }
  };

  for (let i = 0; i < letters.length; i++) {
    recursiveHelper(letters.slice(0, i) + letters.slice(i + 1), letters[i]);
  }

  return new Array(...result);
};
