import { useState } from "react";
import { PLAYER_O, PLAYER_X, Square } from "./Square.jsx";

const BOARD_SIDE = 3;
const BOARD_INDICES = [...Array(BOARD_SIDE).keys()];
const CELL_COUNT = BOARD_SIDE * BOARD_SIDE;
const WIN_POSITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export default function Board() {
    const [status, setStatus] = useState(Array(CELL_COUNT).fill(null));
    const [nextPlayer, setNextPlayer] = useState(PLAYER_X);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [lastCell, setLastCell] = useState(null);
    const [wins, setWins] = useState({ [PLAYER_X]: 0, [PLAYER_O]: 0 });

    function handleClick(idx, player) {
        if (gameOver || player !== nextPlayer || status[idx] !== null) return;

        const newStatus = status.map((value, index) => (index === idx ? player : value));
        const hasWinner = WIN_POSITIONS.some(([first, second, third]) => {
            return newStatus[first] && newStatus[first] === newStatus[second] && newStatus[first] === newStatus[third];
        });

        setStatus(newStatus);
        setLastCell(idx);

        if (hasWinner) {
            setWinner(player);
            setGameOver(true);
            setWins((currentWins) => ({ ...currentWins, [player]: currentWins[player] + 1 }));
        } else if (newStatus.every(Boolean)) {
            setGameOver(true);
        } else {
            setNextPlayer(player === PLAYER_X ? PLAYER_O : PLAYER_X);
        }
    }

    function handlePlayAgain() {
        setStatus(Array(CELL_COUNT).fill(null));
        setNextPlayer(PLAYER_X);
        setWinner(null);
        setGameOver(false);
        setLastCell(null);
    }

    return (
        <div className="board">
            <p className="scoreboard" aria-label="Win counts">
                Wins — {PLAYER_X}: {wins[PLAYER_X]} | {PLAYER_O}: {wins[PLAYER_O]}
            </p>
            <p className="game-status" aria-live="polite">
                {winner ? `Game over! ${winner} won` : gameOver ? "Draw! No winner" : `Next player: ${nextPlayer}`}
            </p>
            {BOARD_INDICES.map((row) => (
                <div className="board-row" key={row}>
                    {BOARD_INDICES.map((column) => {
                        const index = row * BOARD_SIDE + column;

                        return (
                            <Square
                                key={index}
                                value={status[index]}
                                highlight={index === lastCell}
                                onSquareClick={(player) => handleClick(index, player)}
                            />
                        );
                    })}
                </div>
            ))}
            {gameOver && (
                <button className="reset-button" type="button" onClick={handlePlayAgain}>
                    Play again
                </button>
            )}
        </div>
    );
}
