import bishopMove from "../bishopMove";
import kingMove from "../kingMove";
import knightMove from "../knightMove";
import pawnMove from "../pawnMove";
import queenMove from "../queenMove";
import rookMove from "../rookMove";

export const moveFunctions = {
  Bishop: bishopMove,
  King: kingMove,
  Pawn: pawnMove,
  Rook: rookMove,
  Queen: queenMove,
  Knight: knightMove
};
