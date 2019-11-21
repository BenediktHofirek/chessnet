import checkDraw from "../../components/common/game/chessGameFunctions/gameEndFunctions/checkDraw";
import generatePosition from "../supportFunctions/generatePosition";

describe("CheckDraw function", () => {
  test("Two alone kings", () => {
    expect(
      checkDraw(generatePosition([["h1", "whiteKing"], ["h8", "blackKing"]]))
    ).toBe(true);
  });
});
