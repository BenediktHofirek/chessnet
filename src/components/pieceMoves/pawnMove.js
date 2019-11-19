export function pawnMove(firstF, secondF, position, sideToMove) {
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
  //WIP take an passant
}

export function promotion(newPosition) {
  //WIP promotion to other pieces
  for (let x = 0; x < newPosition.length; x++) {
    if (
      Number(newPosition[x].coordinate[1]) === 1 &&
      newPosition[x].piece === "blackPawn"
    ) {
      newPosition[x].piece = "blackQueen";
    } else if (
      Number(newPosition[x].coordinate[1]) === 8 &&
      newPosition[x].piece === "whitePawn"
    ) {
      newPosition[x].piece = "whiteQueen";
    }
  }
}

export function anPassant() {
  console.log(this);
  return;
}
