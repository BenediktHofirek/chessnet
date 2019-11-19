import barrierCheck from "./barrierCheck";

export default function rookMove(firstF, secondF, position, castlingRights) {
  const result =
    (firstF.coordinate[0] === secondF.coordinate[0] ||
      firstF.coordinate[1] === secondF.coordinate[1]) &&
    barrierCheck(firstF, secondF, position);

  //update castling rights
  if (result && castlingRights.includes(firstF.coordinate)) {
    const index = castlingRights.findIndex(e => e === firstF.coordinate);
    castlingRights.splice(index, 1);
  }

  return result;
}
