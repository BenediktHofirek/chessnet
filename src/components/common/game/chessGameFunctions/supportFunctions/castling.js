import updateCastlingRights from "./updateCastlingRights";

export default function castling(
  secondFieldCoordinate,
  newPosition,
  castlingRights
) {
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
