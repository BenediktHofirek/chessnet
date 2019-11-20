export default function pawnMove(firstF, secondF, position) {
  const sideToMove = firstF.piece.slice(0, 5);
  return (
    //move one step forward
    (Number(firstF.coordinate[1]) ===
      +secondF.coordinate[1] + (sideToMove === "white" ? -1 : 1) &&
      firstF.coordinate[0] === secondF.coordinate[0] &&
      !secondF.piece) ||
    //move two step forward from starting position
    (Number(firstF.coordinate[1]) === (sideToMove === "white" ? 2 : 7) &&
      Number(secondF.coordinate[1]) === (sideToMove === "white" ? 4 : 5) &&
      firstF.coordinate[0] === secondF.coordinate[0] &&
      !secondF.piece &&
      !position.find(
        f =>
          f.coordinate ===
          `${firstF.coordinate[0]}${+firstF.coordinate[1] +
            (sideToMove === "white" ? 1 : -1)}`
      ).piece) ||
    //take piece
    (Number(firstF.coordinate[1]) ===
      +secondF.coordinate[1] + (sideToMove === "white" ? -1 : 1) &&
      (String.fromCharCode(firstF.coordinate[0].charCodeAt(0) + 1) ===
        secondF.coordinate[0] ||
        String.fromCharCode(firstF.coordinate[0].charCodeAt(0) - 1) ===
          secondF.coordinate[0]) &&
      secondF.piece.includes(sideToMove === "white" ? "black" : "white"))
  );
}
