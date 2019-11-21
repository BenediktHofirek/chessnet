export default function updateCastlingRights(castlingRights, rank) {
    for (
      let index = castlingRights.findIndex(e => e[1] === rank);
      index !== -1;
      index = castlingRights.findIndex(e => e[1] === rank)
    ) {
      castlingRights.splice(index, 1);
    }
  }