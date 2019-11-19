import pawnMove from "../pawnMove";
import rookMove from "../rookMove";
import bishopMove from "../bishopMove";
import knightMove from "../knightMove";
import kingMove from "../kingMove";
import queenMove from "../queenMove";

export default function checkMove(
  firstClickedField,
  secondClickedField,
  position,
  castlingR,
  sideToMove
) {
  // 5 because "white" and also "black" have both length 5
  switch (firstClickedField.piece.substring(5)) {
    case "Rook":
      return rookMove(
        firstClickedField,
        secondClickedField,
        position,
        castlingR
      );
    case "Knight":
      return knightMove(firstClickedField, secondClickedField);
    case "Bishop":
      return bishopMove(firstClickedField, secondClickedField, position);
    case "Queen":
      return queenMove(firstClickedField, secondClickedField, position);
    case "King":
      return kingMove(
        firstClickedField,
        secondClickedField,
        position,
        castlingR
      );
    case "Pawn":
      return pawnMove(
        firstClickedField,
        secondClickedField,
        position,
        sideToMove
      );
    default:
      break;
  }
}
