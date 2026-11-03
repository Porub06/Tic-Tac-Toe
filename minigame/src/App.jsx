import { useState } from "react";
import "./App.css";
import Board from "../components/Board.jsx";

export default function App() {
    const [lightTheme, setLightTheme] = useState(false);

    return (
        <main className={`app${lightTheme ? " light-theme" : ""}`}>
            <button
                className="theme-button"
                type="button"
                aria-pressed={lightTheme}
                onClick={() => setLightTheme((currentTheme) => !currentTheme)}
            >
                Téma
            </button>
            <Board />
        </main>
    );
}
