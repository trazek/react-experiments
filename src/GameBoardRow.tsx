import styles from "./App.styles.module.css";
import classNames from "classnames";

interface GameBoardRowProps {
  currentWord: string[];
  solution: string;
  isConsidered: boolean;
  updateCSS: boolean;
}

export function GameBoardRow({
  currentWord,
  solution,
  isConsidered,
  updateCSS,
}: GameBoardRowProps) {
  const gameBoardRowCSS: any = {};
  gameBoardRowCSS[styles["gameboard__row"]] = true;

  if (isConsidered) gameBoardRowCSS[styles["gameboard__row--selected"]] = true;

  const solutionArr = solution.split("");

  return (
    <div className={classNames(gameBoardRowCSS)} key={Math.random()}>
      {solutionArr.map((solutionLetter, i) => {
        const gameBoardTileText: any = {};

        gameBoardTileText[styles["gameboard__row__tile"]] = true;

        if (
          currentWord[i] &&
          currentWord[i].toLowerCase() === solutionLetter.toLowerCase() &&
          updateCSS
        ) {
          // Letter matches in exact location, color green

          gameBoardTileText[styles["gameboard__row__tile--correct"]] = true;
        } else if (
          currentWord[i] &&
          solution.toLowerCase().includes(currentWord[i].toLowerCase()) &&
          updateCSS
        ) {
          // Letter is somewhere inside the string, color yellow
          gameBoardTileText[styles["gameboard__row__tile--close"]] = true;
        } else if (
          currentWord[i] &&
          !solution.toLowerCase().includes(currentWord[i].toLowerCase()) &&
          updateCSS
        ) {
          // Letter is not in the string, color gray
          gameBoardTileText[styles["gameboard__row__tile--incorrect"]] = true;
        }

        if (currentWord[i]) {
          gameBoardTileText[styles["gameboard__row__tile--text"]] = true;

          return (
            <div className={classNames(gameBoardTileText)}>
              {currentWord[i]}
            </div>
          );
        } else {
          return <div className={classNames(gameBoardTileText)}></div>;
        }
      })}
    </div>
  );
}
