export default function getBetweenFields(
  firstF,
  secondF
) {
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

  return betweenFields;
}
