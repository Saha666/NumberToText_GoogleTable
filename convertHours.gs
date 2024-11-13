function convertHours() {
  // Запрашиваем подтверждение у пользователя
  var ui = SpreadsheetApp.getUi(); // Интерфейс пользователя
  var response = ui.alert("Подтверждение", "Вы уверены, что хотите преобразовать данные в столбце Hours?", ui.ButtonSet.YES_NO);

  // Если пользователь выбрал "Нет", то останавливаем выполнение скрипта
  if (response !== ui.Button.YES) {
    ui.alert("Операция отменена пользователем.");
    return;
  }
  
  // Основная часть скрипта
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("csv"); // Замените на имя вашего листа
  if (!sheet) {
    Logger.log("Лист не найден!");
    return;
  }
  
  var data = sheet.getRange("A2:F" + sheet.getLastRow()).getValues(); // Получаем данные с 2-й строки до последней
  Logger.log("Данные получены: " + data.length + " строк");

  // Преобразуем данные в столбце Hours (4-й столбец)
  for (var i = 0; i < data.length; i++) {
    var hours = data[i][3]; // Столбец "Hours" (четвертый)
    
    if (hours !== "" && typeof hours === "string") {
      // Заменяем точку на запятую и пытаемся преобразовать в число
      var newHours = parseFloat(hours.replace(",", ".")); // Меняем запятую на точку
      
      if (!isNaN(newHours)) {
        data[i][3] = newHours; // Если преобразование прошло успешно, сохраняем
      } else {
        Logger.log("Ошибка преобразования строки " + (i + 2) + ": значение " + hours);
      }
    }
  }

  // Записываем обратно измененные данные в столбец Hours
  sheet.getRange("A2:F" + sheet.getLastRow()).setValues(data);
  Logger.log("Данные обновлены.");

  // Показываем сообщение по завершении
  ui.alert("Обработка завершена!");
}
