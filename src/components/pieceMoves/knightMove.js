export default function knightMove(firstF, secondF, position) {
  //if there is figure of the same player on both fields
  if (firstF.piece.slice(0, 4) === secondF.piece.slice(0, 4)) {
    return false;
  }

  return (
    secondF.coordinate ===
      `${String.fromCharCode(firstF.coordinate.charCodeAt(0) + 2)}${+firstF
        .coordinate[1] + 1}` ||
    secondF.coordinate ===
      `${String.fromCharCode(firstF.coordinate.charCodeAt(0) + 2)}${+firstF
        .coordinate[1] - 1}` ||
    secondF.coordinate ===
      `${String.fromCharCode(firstF.coordinate.charCodeAt(0) - 2)}${+firstF
        .coordinate[1] + 1}` ||
    secondF.coordinate ===
      `${String.fromCharCode(firstF.coordinate.charCodeAt(0) - 2)}${+firstF
        .coordinate[1] - 1}` ||
    secondF.coordinate ===
      `${String.fromCharCode(firstF.coordinate.charCodeAt(0) + 1)}${+firstF
        .coordinate[1] + 2}` ||
    secondF.coordinate ===
      `${String.fromCharCode(firstF.coordinate.charCodeAt(0) + 1)}${+firstF
        .coordinate[1] - 2}` ||
    secondF.coordinate ===
      `${String.fromCharCode(firstF.coordinate.charCodeAt(0) - 1)}${+firstF
        .coordinate[1] + 2}` ||
    secondF.coordinate ===
      `${String.fromCharCode(firstF.coordinate.charCodeAt(0) - 1)}${+firstF
        .coordinate[1] - 2}`
  );
}
