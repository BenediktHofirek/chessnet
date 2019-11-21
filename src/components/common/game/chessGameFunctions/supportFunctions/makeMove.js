import castling from "./castling";
import checkCheck from "./checkCheck";
import promotion from "./promotion";

export default function makeMove(
  firstClickedField,
  secondClickedField,
  newPosition,
  moveAllowed,
  castlingR,
  sideToMove,
  thisArgument
) {
  //if the move is with the king and castling is allowed and was made, nothing else needs to be done
  if (moveAllowed === "castling") {
    castling(secondClickedField.coordinate, newPosition, castlingR);
  } else {
    const index = newPosition.findIndex(
      e => e.coordinate === secondClickedField.coordinate
    );
    newPosition[index].piece = firstClickedField.piece;
    if (
      (firstClickedField.piece === "whitePawn" &&
        firstClickedField.coordinate[1] === "7") ||
      (firstClickedField.piece === "blackPawn" &&
        firstClickedField.coordinate[1] === "2")
    ) {
      promotion(newPosition, thisArgument);
    }
    newPosition[
      newPosition.findIndex(
        field => field.coordinate === firstClickedField.coordinate
      )
    ].piece = "";
  }

  const moveIsWithoutCheck = checkCheck(
    firstClickedField,
    secondClickedField,
    newPosition,
    moveAllowed,
    sideToMove
  );

  if (!moveIsWithoutCheck) {
    return false;
  }
  //reset clicked piece
  for (let x = 0; x < newPosition.length; x++) {
    newPosition[x].clicked = false;
  }

  return true;
}
