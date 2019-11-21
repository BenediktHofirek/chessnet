export default function generatePosition(pieces) {
  //pieces = [[coordinate, figure],[]]
  const position = [];
  const charH = 104;
  for (let x = 1; x < 9; x++) {
    for (let y = charH; y > charH - 8; y--) {
      position.push({
        coordinate: String.fromCharCode(y) + x.toString(),
        piece: ""
      });
    }
  }

  pieces.forEach(p => {
    position[position.findIndex(f => f.coordinate === p[0])].piece = p[1];
  });

  return pieces;
}
