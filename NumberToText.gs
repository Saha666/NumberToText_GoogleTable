function numberToText(num) {
  const ones = ['', 'один', 'два', 'три', 'чотири', 'п’ять', 'шість', 'сім', 'вісім', 'дев’ять'];
  const teens = ['десять', 'одинадцять', 'дванадцять', 'тринадцять', 'чотирнадцять', 'п’ятнадцять', 'шістнадцять', 'сімнадцять', 'вісімнадцять', 'дев’ятнадцять'];
  const tens = ['', '', 'двадцять', 'тридцять', 'сорок', 'п’ятдесят', 'шістдесят', 'сімдесят', 'вісімдесят', 'дев’яносто'];
  const hundreds = ['', 'сто', 'двісті', 'триста', 'чотириста', 'п’ятсот', 'шістсот', 'сімсот', 'вісімсот', 'дев’ятсот'];

  const units = ['', 'тисяча', 'мільйон', 'мільярд'];
  const scales = ['', 'тисячі', 'мільйона', 'мільярда'];

  if (num === 0) return 'нуль';

  let words = '';
  let partCount = 0;

  while (num > 0) {
    let remainder = num % 1000;
    if (remainder > 0) {
      let part = '';
      part += hundreds[Math.floor(remainder / 100)];
      remainder %= 100;
      if (remainder >= 10 && remainder <= 19) {
        part += (part ? ' ' : '') + teens[remainder - 10];
      } else {
        part += (part ? ' ' : '') + tens[Math.floor(remainder / 10)];
        remainder %= 10;
        part += (part ? ' ' : '') + (partCount === 1 && remainder === 1 ? 'одна' : (partCount === 1 && remainder === 2 ? 'дві' : ones[remainder]));
      }

      let unit = '';
      if (partCount === 1) {
        if (remainder === 1) {
          unit = 'тисяча';
        } else if (remainder >= 2 && remainder <= 4) {
          unit = 'тисячі';
        } else {
          unit = 'тисяч';
        }
      } else if (partCount > 1) {
        unit = units[partCount];
      }

      words = part + ' ' + unit + (words ? ' ' + words : '');
    }
    num = Math.floor(num / 1000);
    partCount++;
  }

  return words.trim();
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function numberWithText(num) {
  const parts = num.toFixed(2).split('.');
  const integerPart = parseInt(parts[0], 10);
  const decimalPart = parts[1] ? parseInt(parts[1], 10) : 0;

  let result = capitalizeFirstLetter(numberToText(integerPart));
  let formattedNumber = num.toFixed(2).replace('.', ',');

  // Форматируем копейки с ведущим нулем, если их меньше 10
  let decimalFormatted = decimalPart < 10 ? `0${decimalPart}` : decimalPart;

  if (decimalPart > 0) {
    return `${formattedNumber} грн. (${result}) грн. ${decimalFormatted} коп. без ПДВ`;
  } else {
    return `${formattedNumber} грн. (${result}) грн. 00 коп. без ПДВ`;
  }
}
