export default function promotion(newPosition, thisArgument) {
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
