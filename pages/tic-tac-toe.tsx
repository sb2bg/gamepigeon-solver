import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Index.module.css";
import tttStyles from "../styles/TicTacToe.module.css";
import { TicTacToeBoard, Player, checkWinner, isBoardFull, findBestMove } from "../util/solver";

const TicTacToe = () => {
  const [board, setBoard] = useState<TicTacToeBoard>(Array(9).fill(null));
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<Player>("X");
  const [userPlayer, setUserPlayer] = useState<Player>("X");
  const [computerPlayer, setComputerPlayer] = useState<Player>("O");
  const [winner, setWinner] = useState<string | null>(null);
  const [bestMoveIndex, setBestMoveIndex] = useState<number>(-1);
  const [gameStatus, setGameStatus] = useState<string>("Your turn");

  // Handle cell click
  const handleCellClick = (index: number) => {
    // Don't allow moves if the game is over or cell is occupied
    if (winner || board[index] || (currentPlayerTurn !== userPlayer)) {
      return;
    }

    // Create a new board with the user's move
    const newBoard = [...board];
    newBoard[index] = userPlayer;
    setBoard(newBoard);
    
    // Switch turns
    setCurrentPlayerTurn(computerPlayer);
    setGameStatus("Computer is thinking...");
    
    // Check if there's a winner or a draw after user's move
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setGameStatus(`${newWinner === userPlayer ? "You" : "Computer"} won!`);
      return;
    }
    
    if (isBoardFull(newBoard)) {
      setGameStatus("Game ended in a draw!");
      return;
    }
    
    // Schedule computer's move
    setTimeout(() => {
      const computerMoveIndex = findBestMove(newBoard, computerPlayer);
      
      // Make computer's move
      const boardAfterComputerMove = [...newBoard];
      boardAfterComputerMove[computerMoveIndex] = computerPlayer;
      setBoard(boardAfterComputerMove);
      
      // Check if there's a winner or a draw after computer's move
      const finalWinner = checkWinner(boardAfterComputerMove);
      if (finalWinner) {
        setWinner(finalWinner);
        setGameStatus(`${finalWinner === userPlayer ? "You" : "Computer"} won!`);
        return;
      }
      
      if (isBoardFull(boardAfterComputerMove)) {
        setGameStatus("Game ended in a draw!");
        return;
      }
      
      // Switch back to user's turn
      setCurrentPlayerTurn(userPlayer);
      setGameStatus("Your turn");
    }, 500);
  };

  // Find the best move without making the move
  const calculateBestMove = () => {
    if (winner || isBoardFull(board) || currentPlayerTurn !== userPlayer) {
      setBestMoveIndex(-1);
      return;
    }
    
    const moveIndex = findBestMove(board, userPlayer);
    setBestMoveIndex(moveIndex);
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayerTurn("X");
    setWinner(null);
    setBestMoveIndex(-1);
    setGameStatus(userPlayer === "X" ? "Your turn" : "Computer plays first");
    
    // If computer goes first, make its move
    if (computerPlayer === "X") {
      setTimeout(() => {
        const computerMoveIndex = findBestMove(Array(9).fill(null), computerPlayer);
        const newBoard = Array(9).fill(null);
        newBoard[computerMoveIndex] = computerPlayer;
        setBoard(newBoard);
        setCurrentPlayerTurn(userPlayer);
        setGameStatus("Your turn");
      }, 500);
    }
  };

  // Switch player (X or O)
  const switchPlayer = (player: Player) => {
    if (board.some(cell => cell !== null)) {
      // Don't allow switching once game has started
      return;
    }
    
    setUserPlayer(player);
    setComputerPlayer(player === "X" ? "O" : "X");
    setCurrentPlayerTurn("X");
    setGameStatus(player === "X" ? "Your turn" : "Computer plays first");
    
    // If computer goes first after switch, make its move
    if (player === "O") {
      setTimeout(() => {
        const computerMoveIndex = findBestMove(Array(9).fill(null), "X");
        const newBoard = Array(9).fill(null);
        newBoard[computerMoveIndex] = "X";
        setBoard(newBoard);
        setCurrentPlayerTurn("O");
        setGameStatus("Your turn");
      }, 500);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Tic-Tac-Toe Solver</title>
        <meta
          name="description"
          content="Play perfect Tic-Tac-Toe with our solver that makes the optimal move every time."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <i className="fas fa-times" style={{ fontSize: "0.8em", marginRight: "15px" }}></i>
          Tic-Tac-Toe Solver
        </h1>
        
        <p className={styles.description}>
          Play against the computer or get hints for the best move
        </p>
        
        <div className={tttStyles.controlsContainer}>
          <div className={tttStyles.controlLabel}>Choose your player:</div>
          <div className={tttStyles.controls}>
            <button 
              className={`${tttStyles.playerButton} ${userPlayer === "X" ? tttStyles.active : ""}`}
              onClick={() => switchPlayer("X")}
            >
              X
            </button>
            <button 
              className={`${tttStyles.playerButton} ${userPlayer === "O" ? tttStyles.active : ""}`}
              onClick={() => switchPlayer("O")}
            >
              O
            </button>
          </div>
        </div>

        <div className={`${tttStyles.gameStatus} ${winner ? tttStyles.winner : ""}`}>
          {gameStatus}
        </div>

        <div className={tttStyles.board}>
          {board.map((cell, index) => (
            <div
              key={index}
              className={`${tttStyles.cell} ${cell ? tttStyles[cell] : ""} ${bestMoveIndex === index ? tttStyles.highlightedCell : ""}`}
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>

        <div className={tttStyles.controlPanel}>
          <button className={styles.actionButton} onClick={resetGame}>
            <i className="fas fa-redo-alt" style={{ marginRight: "8px" }}></i> Reset Game
          </button>
          
          <button className={styles.actionButton} onClick={calculateBestMove}>
            <i className="fas fa-lightbulb" style={{ marginRight: "8px" }}></i> Show Best Move
          </button>
        </div>
        
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/">
            <a className={styles.actionButton}>
              <i className="fas fa-home" style={{ marginRight: "8px" }}></i> Home
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TicTacToe;
