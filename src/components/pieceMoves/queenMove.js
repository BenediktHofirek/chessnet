import barrierCheck from "./barrierCheck";

export default function queenMove(firstF, secondF, position) {
  return (
    (Math.abs(
      firstF.coordinate.charCodeAt(0) - secondF.coordinate.charCodeAt(0)
    ) ===
      Math.abs(Number(firstF.coordinate[1]) - Number(secondF.coordinate[1])) ||
      (firstF.coordinate[0] === secondF.coordinate[0] ||
        firstF.coordinate[1] === secondF.coordinate[1])) &&
    barrierCheck(firstF, secondF, position)
  );
}
