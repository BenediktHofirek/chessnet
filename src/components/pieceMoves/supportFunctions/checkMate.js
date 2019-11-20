import checkCheckOnField from "./checkCheckOnField";
import { moveFunctions } from "./moveFunctions";
import getBetweenFields from "./getBetweenFields";

export default function checkMate(position, sideToMove) {
  const matingSite = sideToMove === "white" ? "black" : "white";
  const kingsCoordinate = position.find(f => f.piece === `${sideToMove}King`)
    .coordinate;
  const kingsField = position.find(f => f.piece === `${sideToMove}King`);
  //if king is in check
  if (!checkCheckOnField(sideToMove, position, kingsCoordinate)) {
    //check if king can go out of check
    const allKingMoves = [
      `${kingsCoordinate[0]}${+kingsCoordinate[1] + 1}`,
      `${kingsCoordinate[0]}${+kingsCoordinate[1] - 1}`,
      `${String.fromCharCode(kingsCoordinate.charCodeAt(0) + 1)}${
        kingsCoordinate[1]
      }`,
      `${String.fromCharCode(kingsCoordinate.charCodeAt(0) - 1)}${
        kingsCoordinate[1]
      }`,
      `${String.fromCharCode(
        kingsCoordinate.charCodeAt(0) + 1
      )}${+kingsCoordinate[1] + 1}`,
      `${String.fromCharCode(
        kingsCoordinate.charCodeAt(0) + 1
      )}${+kingsCoordinate[1] - 1}`,
      `${String.fromCharCode(
        kingsCoordinate.charCodeAt(0) - 1
      )}${+kingsCoordinate[1] + 1}`,
      `${String.fromCharCode(
        kingsCoordinate.charCodeAt(0) - 1
      )}${+kingsCoordinate[1] - 1}`
    ];
    const possibleKingMoves = allKingMoves.filter(m => {
      const field = position.find(f => f.coordinate === m);
      return (
        field &&
        (!field.piece || field.piece.slice(0, 5) === matingSite) &&
        checkCheckOnField(sideToMove, position, m)
      );
    });

    //check if the check can be removed with some other piece
    if (!possibleKingMoves.length) {
      //if there are two attacking pieces
      const attackerPieces = position.filter(
        f => f.piece.slice(0, 5) === matingSite
      );
      const attackingPieces = attackerPieces.filter(p =>
        moveFunctions[p.piece.slice(5)](p, kingsField, position)
      );

      //if there are two attacking pieces, it is already mate
      if (attackingPieces.length === 2) {
        return true;
      }

      //if defender can capture atacking piece
      const defenderPieces = position.filter(
        f => f.piece.slice(0, 5) === sideToMove && f.piece.slice(5) !== "King"
      );

      //second condition check if there is not pin
      const defendingPieces = defenderPieces.filter(
        p =>
          moveFunctions[p.piece.slice(5)](p, attackingPieces[0], position) &&
          checkCheckOnField(
            sideToMove,
            position,
            kingsCoordinate,
            p.coordinate,
            p.coordinate //because rook has three parameters, so there need to be one overcomed
          )
      );

      if (defendingPieces.length) {
        return false;
      }

      //if atacking piece is knight or pawn, it is already mate
      if (
        attackingPieces[0].piece.slice(5) === "Knight" ||
        attackingPieces[0].piece.slice(5) === "Pawn"
      ) {
        return true;
      }

      //check if some piece can be moved in front of the king, to protect him
      const defendingFields = getBetweenFields(kingsField, attackingPieces[0]);

      //if there is no field between atacking piece and king
      if (!defendingFields.length) {
        return true;
      }
      //fields where some figur can be moved
      const savingFields = defendingFields.filter(
        fc =>
          defenderPieces.filter(p =>
            moveFunctions[p.piece.slice(5)](
              p,
              { coordinate: fc, piece: "" },
              position
            )
          ).length
      );

      return !savingFields.length;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
