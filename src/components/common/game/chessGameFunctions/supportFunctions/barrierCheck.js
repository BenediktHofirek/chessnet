import getBetweenFields from "./getBetweenFields";

export default function barrierCheck(
  firstF,
  secondF,
  position,
  pieceToExcludeCoordination
) {
  //if there is figure of the same player on both fields
  if (firstF.piece.slice(0, 5) === secondF.piece.slice(0, 5)) {
    return false;
  }

  //check if there is no figure on the fields between the start and finish field
  const betweenFields = getBetweenFields(firstF, secondF).filter(
    fc => fc !== pieceToExcludeCoordination
  );

  betweenFields.forEach(fc => {
    if (position.find(field => field.coordinate === fc).piece) {
      return false;
    }
  });

  const results = betweenFields.map(field => {
    return !position.find(f => f.coordinate === field).piece;
  });

  return !results.includes(false);
}
