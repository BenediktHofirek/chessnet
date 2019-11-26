export default function moveRecord(firstF, secondF, position, gameRecord) {
  const piece = firstF.piece.slice(5) === "Pawn" ? "" : firstF.piece.slice(5);

  const middlePart = secondF.piece ? "x" : "";

  let firstPart = "";
  switch (piece) {
    case "":
      firstPart = middlePart === "x" ? firstF.coordinate[0] : "";
      break;
    case "Knight":
      firstPart = "N";
      break;
    default:
      firstPart = piece[0].toUpperCase();
  }

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
  } else if (
    piece === "King" &&
    Math.abs(
      +firstF.coordinate.charCodeAt(0) -
        Number(secondF.coordinate.charCodeAt(0))
    ) === 2
  ) {
    gameRecord.push(secondF.coordinate[0] === "c" ? "O-O-O" : "O-O");
  } else {
    gameRecord.push(`${firstPart}${middlePart}${endPart}`);
  }
}
