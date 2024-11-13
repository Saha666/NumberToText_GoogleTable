function multiplyAndRound(cell1, cell2) {
  // Перемножаем числа
  var result = cell1 * cell2;
  
  // Округляем результат до 4 знаков после запятой
  var resultFourDecimal = Math.round(result * 10000) / 10000;
  
  // Округляем до 2 знаков после запятой
  var roundedResult = Math.round(resultFourDecimal * 100) / 100;
  
  // Преобразуем число в строку и заменяем точку на запятую
  var resultWithComma = roundedResult.toFixed(2).replace('.', ',');
  
  // Возвращаем округленный результат
  return resultWithComma;
}
