export default function moveRecord(firstF, secondF, position, gameRecord){
    const piece = firstF.piece.slice(5) === "Pawn" ? "" : firstF.piece.slice(5);
    let firstPart = "";
    switch(piece){
        case "Pawn":
        break;
        case "Knight":
        firstPart = "N";
        break;
        default:
        
    } 

    if(!piece && (secondF.coordinate[1] === "1" || secondF.coordinate[1] === "1" )){

    }
}