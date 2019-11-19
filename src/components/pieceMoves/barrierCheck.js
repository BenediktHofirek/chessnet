export default function barrierCheck(firstF, secondF, position) {
  //if there is figure of the same player on both fields
  if (firstF.piece.slice(0, 4) === secondF.piece.slice(0, 4)) {
    return false;
  }

  //check if there is no figure on the fields between the start and finish field
  const betweenFields = [];
  const numbers = [];
  const chars = [];

  const firstNumber = Number(firstF.coordinate[1]);
  const secondNumber = Number(secondF.coordinate[1]);
  if (firstNumber === secondNumber) {
    for (let x = 0; x < 6; x++) {
      numbers.push(firstNumber);
    }
  } else {
    const numberIncrement = firstNumber - secondNumber > 0 ? -1 : 1;
    let numberPlaceholder = firstNumber;
    for (let x = 0; x < Math.abs(firstNumber - secondNumber) - 1; x++) {
      numberPlaceholder += numberIncrement;
      numbers.push(numberPlaceholder);
    }
  }

  const firstCharNumber = firstF.coordinate[0].charCodeAt(0);
  const secondCharNumber = secondF.coordinate[0].charCodeAt(0);

  if (firstCharNumber === secondCharNumber) {
    for (let x = 0; x < 6; x++) {
      chars.push(String.fromCharCode(firstCharNumber));
    }
  } else {
    const charNumberIncrement = firstCharNumber - secondCharNumber > 0 ? -1 : 1;
    let charPlaceholder = firstCharNumber;
    for (let x = 0; x < Math.abs(firstCharNumber - secondCharNumber) - 1; x++) {
      charPlaceholder += charNumberIncrement;
      chars.push(String.fromCharCode(charPlaceholder));
    }
  }

  for (let x = 0; x < Math.min(numbers.length, chars.length); x++) {
    betweenFields.push(`${chars[x]}${numbers[x]}`);
  }

  betweenFields.forEach(fc => {
    if (position.find(field => field.coordinate === fc).piece) {
      return false;
    }
  });

  const results = betweenFields.map(field => {
    return !position.find(f => f.coordinate === field).piece;
  });

  return !results.includes(false);
}
