import c from "../../../../others/c";
import checkMove from "../supportFunctions/checkMove";
import makeMove from "../supportFunctions/makeMove";

export default function checkDraw(position, sideToMove, gameRecord) {
  //kings without pawns
  if (position.every(f => !f.piece || f.piece.slice(5) === "King")) {
    return true;
  }
  //king and mirror piece vs king
  const figuresWithoutKings = position.filter(
    f => f.piece && f.piece.slice(5) !== "King"
  );

  if (
    figuresWithoutKings.length === 1 &&
    (figuresWithoutKings[0].piece.slice(5) === "Bishop" ||
      figuresWithoutKings[0].piece.slice(5) === "Knight")
  ) {
    return true;
  }

  //kings and same coloured bishops
  if (
    figuresWithoutKings.length === 2 &&
    figuresWithoutKings.some(p => p.piece === "whiteBishop") &&
    figuresWithoutKings.some(p => p.piece === "blackBishop") &&
    !(
      Math.abs(
        Math.abs(
          figuresWithoutKings[0].coordinate.charCodeAt(0) -
            figuresWithoutKings[1].coordinate.charCodeAt(0)
        ) -
          Math.abs(
            Number(figuresWithoutKings[0].coordinate[1]) -
              Number(figuresWithoutKings[1].coordinate[1])
          )
      ) % 2
    )
  ) {
    return true;
  }

  //stalemate
  const allPiecesToMove = position.filter(
    p => p.piece.slice(0, 5) === sideToMove
  );
  const isMovePossible = allPiecesToMove.some(p =>
    position
      .map(
        f =>
          checkMove(p, f, position) &&
          makeMove(p, f, c(position), true, [], sideToMove)
      )
      .some(bolVal => bolVal)
  );
  if (!isMovePossible) {
    return true;
  }

  //TODO 50 moves rule
  return false;
}
