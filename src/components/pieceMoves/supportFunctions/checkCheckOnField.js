import { moveFunctions } from "./moveFunctions";

export default function checkCheckOnField(
  sideToMove,
  position,
  coordinatesToCheck,
  pieceToExcludeCoordination
) {
  const sideToAttack = sideToMove === "white" ? "black" : "white";
  const coordinatesTC = Array.isArray(coordinatesToCheck)
    ? coordinatesToCheck
    : [coordinatesToCheck];
  
  //true = king safe
  return !position //find atacker pieces
    .map(f => (f.piece.includes(sideToAttack) && f) || null)
    .filter(e => e)
    .map(p =>
      coordinatesTC.map(c =>
        moveFunctions[p.piece.substring(5)](
          p,
          {
            piece: `${sideToMove}King`,
            coordinate: c
          },
          position,
          pieceToExcludeCoordination
        )
      )
    )
    .flat()
    .includes(true);
}
