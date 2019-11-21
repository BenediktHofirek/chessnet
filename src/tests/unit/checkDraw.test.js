import checkDraw from "../../components/common/game/chessGameFunctions/gameEndFunctions/checkDraw";
import generatePosition from "../supportFunctions/generatePosition";

describe("CheckDraw function", () => {
  test("Two alone kings", () => {
    expect(
      checkDraw(generatePosition([["h1", "whiteKing"], ["h8", "blackKing"]]))
    ).toBe(true);
  });

  test("Two kings with mirror piece", () => {
    expect(
      checkDraw(
        generatePosition([
          ["h1", "whiteKing"],
          ["h8", "blackKing"],
          ["a7", "blackBishop"]
        ]),
        "white"
      )
    ).toBe(true);
  });

  test("Two kings and same coloured bishops", () => {
    expect(
      checkDraw(
        generatePosition([
          ["h1", "whiteKing"],
          ["h8", "blackKing"],
          ["a7", "blackBishop"],
          ["a3", "whiteBishop"]
        ]),
        "white"
      )
    ).toBe(true);
  });

  test("Two kings and opposite coloured bishops", () => {
    expect(
      checkDraw(
        generatePosition([
          ["h1", "whiteKing"],
          ["h8", "blackKing"],
          ["a6", "blackBishop"],
          ["a3", "whiteBishop"]
        ]),
        "white"
      )
    ).toBe(false);
  });
});
