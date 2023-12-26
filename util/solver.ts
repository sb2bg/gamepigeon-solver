import {Grid} from "../pages/word-hunt";

const getWords = async (): Promise<Set<string>> => {
  return new Set(
    await fetch("words.txt")
      .then((r) => r.text())
      .then((r) => r.split(/\s+/))
  );
};

const dict = getWords();

export const solveAnagrams = async (letters: string) => {
  const result: Set<string> = new Set();
  const words = await dict;

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

export const solveWordHunt = async (grid: Grid) => {
  const words = await dict;

  const rows = grid.length;
  const cols = grid[0].length;
  const result: Map<string, [number, number][]> = new Map();

  const visited: boolean[][] = Array.from({length: rows}, () =>
    Array(cols).fill(false)
  );

  const dfs = (
    row: number,
    col: number,
    path: string,
    route: [number, number][]
  ) => {
    if (row < 0 || col < 0 || row >= rows || col >= cols || visited[row][col]) {
      return;
    }

    path += grid[row][col];
    route.push([row, col]);

    if (words.has(path.toUpperCase())) {
      result.set(path, route.slice());
    }

    visited[row][col] = true;

    dfs(row + 1, col, path, route);
    dfs(row - 1, col, path, route);
    dfs(row, col + 1, path, route);
    dfs(row, col - 1, path, route);
    dfs(row + 1, col + 1, path, route);
    dfs(row + 1, col - 1, path, route);
    dfs(row - 1, col + 1, path, route);
    dfs(row - 1, col - 1, path, route);

    visited[row][col] = false;
    route.pop();
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dfs(row, col, "", []);
    }
  }

  return result;
};
