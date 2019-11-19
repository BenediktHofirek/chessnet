export function kingMove(firstF, secondF, position, castlingRights) {
  //if there is figure of the same player on both fields
  if (firstF.piece.slice(0, 4) === secondF.piece.slice(0, 4)) {
    return false;
  }
  //WIP check blocated fields and going over check in long castle
  const checkCastling = () => {
    const playerColor = firstF.piece.slice(0, 4);
    const kingRank = playerColor === "white" ? 1 : 8;
    return (
      firstF.coordinate === `e${kingRank}` &&
      ((secondF.coordinate === `g${kingRank}` &&
        position.find(f => f.coordinate === `h${kingRank}`).piece ===
          `${playerColor}Rook` &&
        castlingRights.includes(`h${kingRank}`)) ||
        (secondF.coordinate === `c${kingRank}` &&
          position.find(f => f.coordinate === `a${kingRank}`).piece ===
            `${playerColor}Rook` &&
          castlingRights.includes(`a${kingRank}`)))
    );
  };

  return (
    (Math.abs(
      firstF.coordinate.charCodeAt(0) - secondF.coordinate.charCodeAt(0)
    ) <= 1 &&
      Math.abs(Number(firstF.coordinate[1]) - Number(secondF.coordinate[1])) <=
        1) ||
    checkCastling()
  );
}

export function castling(secondFieldCoordinate, newPosition, castlingRights) {
  const castle = (king, rook, rookFinal) => {
    newPosition.forEach((field, index) => {
      if (
        (field.piece.slice(5) === "King" && field.coordinate[2] === king[2]) ||
        (field.piece.slice(5) === "Rook" && field.coordinate === rook)
      ) {
        newPosition[index].piece = "";
      } else if (field.coordinate === king) {
        newPosition[index].piece = king[2] === "1" ? "whiteKing" : "blackKing";
      } else if (field.coordinate === rookFinal) {
        newPosition[index].piece = king[2] === "1" ? "whiteRook" : "blackRook";
      }
    });

    //update castling rights
    const index = castlingRights.findIndex(e => e === rook);
    castlingRights.splice(index, 1);
  };

  switch (secondFieldCoordinate) {
    case "g1":
      castle("g1", "h1", "f1");
      break;
    case "c1":
      castle("c1", "a1", "d1");
      break;
    case "g8":
      castle("g8", "h8", "f8");
      break;
    case "c8":
      castle("c8", "a8", "d8");
      break;
    default:
      break;
  }
}
