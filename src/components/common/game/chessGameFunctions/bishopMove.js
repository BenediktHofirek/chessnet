import barrierCheck from "./supportFunctions/barrierCheck";

export default function bishopMove(firstF, secondF, position, pieceToExcludeCoordination) {
  return (
    Math.abs(
      firstF.coordinate.charCodeAt(0) - secondF.coordinate.charCodeAt(0)
    ) ===
      Math.abs(Number(firstF.coordinate[1]) - Number(secondF.coordinate[1])) &&
    barrierCheck(firstF, secondF, position, pieceToExcludeCoordination)
  );
}
