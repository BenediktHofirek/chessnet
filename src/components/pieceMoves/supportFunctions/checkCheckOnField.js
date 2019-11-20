import {moveFunctions} from "./moveFunctions";

export default function checkCheckOnField(
  sideToMove,
  position,
  ...fieldsToCheck
) {
  const sideToCheck = sideToMove === "white" ? "black" : "white";

  let result = true;
  position.forEach(field => {
    if (field.piece.includes(sideToCheck)) {
      fieldsToCheck.forEach(ftc => {
        if (
          moveFunctions[field.piece.slice(5)](
            field,
            { piece: `${sideToMove}King`, coordinate: ftc },
            position
          )
        ) {
          result = false;
        }
      });
    }
  });

  return result;
}
