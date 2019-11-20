import barrierCheck from "./supportFunctions/barrierCheck";

export default function rookMove(firstF, secondF, position, castlingRights, pieceToExcludeCoordination) {
  const result =
    (firstF.coordinate[0] === secondF.coordinate[0] ||
      firstF.coordinate[1] === secondF.coordinate[1]) &&
    barrierCheck(firstF, secondF, position, pieceToExcludeCoordination);

  //update castling rights
  if (result && castlingRights && typeof castlingRights === "object" && castlingRights.includes(firstF.coordinate)) {
    const index = castlingRights.findIndex(e => e === firstF.coordinate);
    castlingRights.splice(index, 1);
  }

  return result;
}
