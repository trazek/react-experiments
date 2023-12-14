import { useEffect, useState } from "react";
import "./App.css";
import styles from "./App.styles.module.css";

import { GameBoardRow } from "./GameBoardRow";

const WORD_LIST_API_URL = "/mock-data.json";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [currentTry, setCurrentTry] = useState(0);
  const [guesses, setGuesses] = useState(["", "", "", "", ""]);
  const [updateCSS, setUpdateCSS] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(WORD_LIST_API_URL);

      const jsonData = await data.json();

      const randomWord = jsonData[Math.floor(Math.random() * jsonData.length)];
      console.log("The secret word is ", randomWord);
      setSecretWord(randomWord);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const keypressListener = (event: KeyboardEvent) => {
      const pressedKey = event.key.toLowerCase();
      let guessesCopy = [...guesses];

      if (currentTry === 5) return;

      if (
        pressedKey.length === 1 &&
        pressedKey.match(/[a-z]/i) &&
        guessesCopy[currentTry].length < 5
      ) {
        //Add letters to current guess
        guessesCopy[currentTry] += pressedKey;
        setGuesses(guessesCopy);
      } else if (
        pressedKey === "enter" &&
        guessesCopy[currentTry].length === 5
      ) {
        //Figure out if the game is over...

        const updateCSSCopy = [...updateCSS];
        updateCSSCopy[currentTry] = true;

        setUpdateCSS(updateCSSCopy);
        setCurrentTry(currentTry + 1);

        if (secretWord.toLowerCase() === guessesCopy[currentTry]) {
          // Game over
          setCurrentTry(5);
        }
      } else if (
        pressedKey === "backspace" &&
        guessesCopy[currentTry].length > 0
      ) {
        // Remove letters from current guess
        guessesCopy[currentTry] = guessesCopy[currentTry].slice(0, -1);
        setGuesses(guessesCopy);
      }
    };

    document.addEventListener("keydown", keypressListener);

    return () => {
      document.removeEventListener("keydown", keypressListener);
    };
  }, [guesses, currentTry, updateCSS]);

  return (
    <div className={styles.App}>
      <div className={styles.gameboard}>
        {guesses.map((_, i) => {
          return (
            <GameBoardRow
              currentWord={guesses[i].split("")}
              solution={secretWord}
              isConsidered={false}
              updateCSS={updateCSS[i]}
              key={"game_row_" + i}
            ></GameBoardRow>
          );
        })}
      </div>
    </div>
  );
}

export default App;
