import {Grid} from "../pages/word-hunt";
import x from "../public/words.json";

const words = new Set(x as string[]);

export const solveAnagrams = async (letters: string) => {
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

class TrieNode {
  children: {[key: string]: TrieNode} = {};
  isWord: boolean = false;
}

class Trie {
  root: TrieNode = new TrieNode();

  insert(word: string) {
    let node = this.root;
    for (let c of word) {
      if (!node.children[c]) {
        node.children[c] = new TrieNode();
      }
      node = node.children[c];
    }
    node.isWord = true;
  }

  searchPrefix(prefix: string): boolean {
    let node = this.root;
    for (let c of prefix) {
      node = node.children[c];
      if (!node) {
        return false;
      }
    }
    return true;
  }
}

export const solveWordHunt = async (grid: Grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const result: Map<string, [number, number][]> = new Map();

  const trie = new Trie();
  words.forEach((word) => trie.insert(word));

  const visited: boolean[][] = Array.from({length: rows}, () =>
    Array(cols).fill(false)
  );

  const dfs = (
    row: number,
    col: number,
    path: string[],
    route: [number, number][]
  ) => {
    if (row < 0 || col < 0 || row >= rows || col >= cols || visited[row][col]) {
      return;
    }

    path.push(grid[row][col]);
    route.push([row, col]);

    const pathStr = path.join("");
    if (!trie.searchPrefix(pathStr)) {
      path.pop();
      route.pop();
      return;
    }

    if (words.has(pathStr.toUpperCase())) {
      result.set(pathStr, route.slice());
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
    path.pop();
    route.pop();
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dfs(row, col, [], []);
    }
  }

  return result;
};
