import updateCastlingRights from './supportFunctions/updateCastlingRights';

export default function kingMove(firstF, secondF, position, castlingRights) {
  //if there is figure of the same player on both
  const playerColour = firstF.piece.slice(0, 5);
  const kingRank = playerColour === "white" ? "1" : "8";

  if (playerColour === secondF.piece.slice(0, 5)) {
    return false;
  }
  //WIP check blocated fields and going over check in long castle
  const checkCastling = () => {
    if (
      firstF.coordinate === `e${kingRank}` &&
      ((secondF.coordinate === `g${kingRank}` &&
        position.find(f => f.coordinate === `h${kingRank}`).piece ===
          `${playerColour}Rook` &&
        castlingRights.includes(`h${kingRank}`)) ||
        (secondF.coordinate === `c${kingRank}` &&
          position.find(f => f.coordinate === `a${kingRank}`).piece ===
            `${playerColour}Rook` &&
          castlingRights.includes(`a${kingRank}`)))
    ) {
      return "castling";
    } else return false;
  };

  const result =
    (Math.abs(
      firstF.coordinate.charCodeAt(0) - secondF.coordinate.charCodeAt(0)
    ) <= 1 &&
      Math.abs(Number(firstF.coordinate[1]) - Number(secondF.coordinate[1])) <=
        1) ||
    checkCastling();

  if (result && castlingRights.find(e => e[1] === kingRank)) {
    updateCastlingRights(castlingRights, kingRank);
  }

  return result;
}




