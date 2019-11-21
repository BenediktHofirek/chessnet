import checkMate from "./checkMate";
import checkDraw from "./checkDraw";

export default function checkGameEnd(position, sideToMove, gameRecord) {
  const mate = checkMate(position, sideToMove);
  if (mate) {
    return "mate";
  }
  const draw = checkDraw(position, sideToMove, gameRecord);
  if (draw) {
    return "draw";
  }
  return false;
}
