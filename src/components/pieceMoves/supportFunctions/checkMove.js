import {moveFunctions} from "./moveFunctions";

export default function checkMove(
  firstClickedField,
  secondClickedField,
  position,
  castlingR
) {
  // 5 because "white" and also "black" have both length 5
  return  moveFunctions[firstClickedField.piece.substring(5)](
    firstClickedField,
    secondClickedField,
    position,
    castlingR
  );
}
