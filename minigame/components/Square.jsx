export const PLAYER_X = "X";
export const PLAYER_O = "O";

export function Square({ value, highlight, onSquareClick }) {
    function handleContextMenu(event) {
        event.preventDefault();
        onSquareClick(PLAYER_O);
    }

    const className = `square${highlight ? " lastcell" : ""}`;

    return (
        <button
            className={className}
            type="button"
            aria-label={`Square ${value ?? "empty"}`}
            onClick={() => onSquareClick(PLAYER_X)}
            onContextMenu={handleContextMenu}
        >
            {value}
        </button>
    );
}
