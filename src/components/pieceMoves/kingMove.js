export function kingMove(firstF, secondF, position, castlingRights) {
  //if there is figure of the same player on both
  const playerColour = firstF.piece.slice(0, 5);
  const kingRank = playerColour === "white" ? "1" : "8";

  if (playerColour === secondF.piece.slice(0, 5)) {
    return false;
  }
  //WIP check blocated fields and going over check in long castle
  const checkCastling = () => {
    if (
      firstF.coordinate === `e${kingRank}` &&
      ((secondF.coordinate === `g${kingRank}` &&
        position.find(f => f.coordinate === `h${kingRank}`).piece ===
          `${playerColour}Rook` &&
        castlingRights.includes(`h${kingRank}`)) ||
        (secondF.coordinate === `c${kingRank}` &&
          position.find(f => f.coordinate === `a${kingRank}`).piece ===
            `${playerColour}Rook` &&
          castlingRights.includes(`a${kingRank}`)))
    ) {
      return "castling";
    } else return false;
  };

  const result =
    (Math.abs(
      firstF.coordinate.charCodeAt(0) - secondF.coordinate.charCodeAt(0)
    ) <= 1 &&
      Math.abs(Number(firstF.coordinate[1]) - Number(secondF.coordinate[1])) <=
        1) ||
    checkCastling();

  if (result && castlingRights.find(e => e[1] === kingRank)) {
    updateCastlingRights(castlingRights, kingRank);
  }

  return result;
}

export function castling(secondFieldCoordinate, newPosition, castlingRights) {
  console.log("pruchod");
  const castle = (king, rook, rookFinal) => {
    newPosition.forEach((field, index) => {
      if (
        (field.piece.slice(5) === "King" && field.coordinate[1] === king[1]) ||
        (field.piece.slice(5) === "Rook" && field.coordinate === rook)
      ) {
        newPosition[index].piece = "";
      } else if (field.coordinate === king) {
        newPosition[index].piece = king[1] === "1" ? "whiteKing" : "blackKing";
      } else if (field.coordinate === rookFinal) {
        newPosition[index].piece = king[1] === "1" ? "whiteRook" : "blackRook";
      }
    });

    //update castling rights
    updateCastlingRights(castlingRights, king[1]);
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

function updateCastlingRights(castlingRights, rank) {
  for (
    let index = castlingRights.findIndex(e => e[1] === rank);
    index != -1;
    index = castlingRights.findIndex(e => e[1] === rank)
  ) {
    castlingRights.splice(index, 1);
  }
}
