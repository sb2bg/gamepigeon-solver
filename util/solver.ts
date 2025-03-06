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

// Tic Tac Toe Game State Type
export type TicTacToeBoard = Array<string | null>;
export type Player = 'X' | 'O';

// Check if there's a winner
export const checkWinner = (board: TicTacToeBoard): string | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

// Check if the board is full (draw)
export const isBoardFull = (board: TicTacToeBoard): boolean => {
  return board.every(cell => cell !== null);
};

// Minimax algorithm with alpha-beta pruning
export const minimax = (
  board: TicTacToeBoard,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity,
  player: Player = 'X',
  opponent: Player = 'O'
): number => {
  // Check for terminal state
  const winner = checkWinner(board);
  if (winner === player) return 10 - depth;
  if (winner === opponent) return depth - 10;
  if (isBoardFull(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = player;
        const score = minimax(board, depth + 1, false, alpha, beta, player, opponent);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = opponent;
        const score = minimax(board, depth + 1, true, alpha, beta, player, opponent);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  }
};

// Find the best move
export const findBestMove = (board: TicTacToeBoard, currentPlayer: Player): number => {
  const opponent = currentPlayer === 'X' ? 'O' : 'X';
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = currentPlayer;
      const score = minimax(board, 0, false, -Infinity, Infinity, currentPlayer, opponent);
      board[i] = null;
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};
