export function createStartingPosition(playerColour) {
  const startingPosition = [];
  const charH = 104;
  for (let x = 1; x < 9; x++) {
    for (let y = charH; y > charH - 8; y--) {
      let piece = "";

      if (x === 1 || x === 2) {
        piece = piece + "white";
      } else if (x === 7 || x === 8) {
        piece = piece + "black";
      }

      if (x === 2 || x === 7) {
        piece = piece + "Pawn";
      } else if (
        piece &&
        (String.fromCharCode(y) === "a" || String.fromCharCode(y) === "h")
      ) {
        piece = piece + "Rook";
      } else if (
        piece &&
        (String.fromCharCode(y) === "b" || String.fromCharCode(y) === "g")
      ) {
        piece = piece + "Knight";
      } else if (
        piece &&
        (String.fromCharCode(y) === "c" || String.fromCharCode(y) === "f")
      ) {
        piece = piece + "Bishop";
      } else if (piece && String.fromCharCode(y) === "d") {
        piece = piece + "Queen";
      } else if (piece && String.fromCharCode(y) === "e") {
        piece = piece + "King";
      }

      startingPosition.push({
        coordinate: String.fromCharCode(y) + x.toString(),
        piece
      });
    }
  }

  const startingPositionByPlayerColour =
    playerColour === "white" ? startingPosition.reverse() : startingPosition;

  return startingPositionByPlayerColour;
}
