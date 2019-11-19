import barrierCheck from "./barrierCheck";

export default function rookMove(firstF, secondF, position, castlingRights) {
  //WIP update castling rights
  return (
    (firstF.coordinate[0] === secondF.coordinate[0] ||
      firstF.coordinate[1] === secondF.coordinate[1]) &&
    barrierCheck(firstF, secondF, position)
  );
}
