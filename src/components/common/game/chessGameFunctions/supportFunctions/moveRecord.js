export default function moveRecord(firstF, secondF, position, gameRecord) {
  const piece = firstF.piece.slice(5) === "Pawn" ? "" : firstF.piece.slice(5);
  let firstPart = "";
  switch (piece) {
    case "":
      break;
    case "Knight":
      firstPart = "N";
      break;
    default:
      firstPart = piece[0].toUpperCase();
  }

  const middlePart = secondF.piece ? "x" : "";
  const endPart = secondF.coordinate;

  if (
    !piece &&
    (secondF.coordinate[1] === "1" || secondF.coordinate[1] === "8")
  ) {
    let newPiece = "";
    switch (
      position[
        position.findIndex(f => f.coordinate === secondF.coordinate)
      ].piece.slice(5)
    ) {
      case "Knight":
        newPiece = "N";
        break;
      case "Queen":
        newPiece = "Q";
        break;
      case "Bishop":
        newPiece = "B";
        break;
      case "Rook":
        newPiece = "R";
        break;
      default:
        break;
    }
    gameRecord.push(`${firstPart}${middlePart}${endPart}=${newPiece}`);
  } else {
    gameRecord.push(`${firstPart}${middlePart}${endPart}`);
  }
}
