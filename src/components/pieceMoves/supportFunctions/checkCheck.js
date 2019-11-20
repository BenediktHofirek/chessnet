import checkCheckOnField from "./checkCheckOnField";

export default function checkCheck(firstF, secondF, position, moveAllowed, sideToMove) {
  if (moveAllowed === "castling") {
    switch (secondF.coordinate) {
      case "g1":
        return checkCheckOnField(sideToMove, position, "g1", "f1");
      case "c1":
        return checkCheckOnField(sideToMove, position, "c1", "d1");
      case "g8":
        return checkCheckOnField(sideToMove, position, "g8", "f8");
      case "c8":
        return checkCheckOnField(sideToMove, position, "c8", "d8");
      default:
        break;
    }
  } else {
    return checkCheckOnField(
      sideToMove,
      position,
      firstF.piece.slice(5) === "King"
        ? secondF.coordinate
        : position.find(e => e.piece === `${sideToMove}King`).coordinate
    );
  }
}
