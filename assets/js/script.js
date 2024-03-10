var userForm = $("#form")
var inputTime = $("#inputTime")
var list = $('#list')
var time;
var jsonData = null
var tableBody = document.querySelector('#tbody');
var datesSection =document.getElementById('dates')

userForm.on("submit", function (event) {
  event.preventDefault()
  time = inputTime.val()
  console.log(time)
  addToPage()
  checkStatus()
  return time
})

function addToPage() {
  var newItem = $('<li>')
  newItem.text(time)
  list.append(newItem)
}

function checkStatus() {
  if (time > 30) {
    var newItem = $('<li>')
    newItem.text('nap 30')
    list.append(newItem)
  } if (time > 145) {
    var newItem = $('<li>')
    newItem.text('stem')
    list.append(newItem)
  }
}

function convertExcelToJson() {
  // Get the input element
  var input = document.getElementById('excelFileInput');

  // Get the selected file
  var file = input.files[0];

  if (file) {
    // Read the Excel file
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = new Uint8Array(e.target.result);

      // Parse the Excel file
      var workbook = XLSX.read(data, { type: 'array' });

      // Get the first sheet
      var sheetName = workbook.SheetNames[0];
      var sheet = workbook.Sheets[sheetName];

      // Convert sheet data to JSON
      jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Display the JSON data
      jsonData.splice(0,1)
      jsonData.splice(jsonData.length-3,3)
      console.log(jsonData);
      
      
      // Turn a column into an object that contains a key-value pair for the date, as well as student: time
      var date0 = {
        date: jsonData[0][3]
      }
      var date0additions = {}
      // Use a loop to create key-value pairs
      for (var i = 1; i < jsonData.length; i++) {
        // Assuming you want to use the array elements as keys and their indices as values
        date0additions[jsonData[i][0]] = jsonData[i][3]
      }
      Object.assign(date0, date0additions);
      console.log(date0)
      
      var date1 = {
        date: jsonData[0][5]
      }
      var date1additions = {}
      // Use a loop to create key-value pairs
      for (var i = 1; i < jsonData.length; i++) {
        // Assuming you want to use the array elements as keys and their indices as values
        date1additions[jsonData[i][0]] = jsonData[i][5]
      }
      Object.assign(date1, date1additions);
      console.log(date1)

      var date2 = {
        date: jsonData[0][7]
      }
      var date2additions = {}
      // Use a loop to create key-value pairs
      for (var i = 1; i < jsonData.length; i++) {
        // Assuming you want to use the array elements as keys and their indices as values
        date2additions[jsonData[i][0]] = jsonData[i][7]
      }
      Object.assign(date2, date2additions);
      console.log(date2)

      var date3 = {
        date: jsonData[0][9]
      }
      var date3additions = {}
      // Use a loop to create key-value pairs
      for (var i = 1; i < jsonData.length; i++) {
        // Assuming you want to use the array elements as keys and their indices as values
        date3additions[jsonData[i][0]] = jsonData[i][9]
      }
      Object.assign(date3, date3additions);
      console.log(date3)

      var date4 = {
        date: jsonData[0][11]
      }
      var date4additions = {}
      // Use a loop to create key-value pairs
      for (var i = 1; i < jsonData.length; i++) {
        // Assuming you want to use the array elements as keys and their indices as values
        date4additions[jsonData[i][0]] = jsonData[i][11]
      }
      Object.assign(date4, date4additions);
      console.log(date4)

      var date5 = {
        date: jsonData[0][14]
      }
      var date5additions = {}
      // Use a loop to create key-value pairs
      for (var i = 1; i < jsonData.length; i++) {
        // Assuming you want to use the array elements as keys and their indices as values
        date5additions[jsonData[i][0]] = jsonData[i][14]
      }
      Object.assign(date5, date5additions);
      console.log(date5)

      var date6 = {
        date: jsonData[0][16]
      }
      var date6additions = {}
      // Use a loop to create key-value pairs
      for (var i = 1; i < jsonData.length; i++) {
        // Assuming you want to use the array elements as keys and their indices as values
        date6additions[jsonData[i][0]] = jsonData[i][16]
      }
      Object.assign(date6, date6additions);
      console.log(date6)

      // forADate(date0)
      forADate(date1)
      forADate(date2)
      forADate(date3)
      forADate(date4)
      forADate(date5)
      // forADate(date6)

      // Function to check if a value matches the "H:MM" format

      function forADate(dateChosen) {
        function isValidTimeFormat(value) {
          // Regular expression to match the "H:MM" format
          var timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
          return timeRegex.test(value);
        }

        // Function to filter the object and create a new object with valid times
        function filterObjectByTimeFormat(inputObject) {
          var outputObject = {};

          for (var key in inputObject) {
            var value = inputObject[key];

            // Check if the value matches the "H:MM" format
            if (value === undefined) {
              outputObject[key] = 'absent';
            }
            else if (isValidTimeFormat(value)) {
              outputObject[key] = value;
            }
          }

          return outputObject;
        }

        // Use the function to create a new object with valid times
        var validTimesObject = filterObjectByTimeFormat(dateChosen);

        // Display the resulting object
        console.log(validTimesObject);
        function convertExcelTimeToMinutes(excelTime) {
          var [hours, minutes] = excelTime.split(':');
          var parsedHours = parseInt(hours);
          var parsedMinutes = parseInt(minutes);



          if (isNaN(parsedHours) || isNaN(parsedMinutes)) {
            
            return NaN;
          }

          return parsedHours * 60 + parsedMinutes;
        }
        // Function to categorize values based on new conditions
        function categorizeValues(value) {
          var time1_15 = 75; // 1:15 in minutes
          var time1_45 = 105; // 1:45 in minutes
          var time2_15 = 135; // 2:15 in minutes
          var time2_45 = 165; // 2:45 in minutes

          if (value === 'absent') {
            return 'absent';
          } else if (isValidTimeFormat(value)) {
            value = convertExcelTimeToMinutes(value);

            if (value <= time1_15) {
              return 'literacyOnly';
            } else if (value <= time1_45) {
              return 'litAndSnack';
            } else if (value <= time2_15) {
              return 'litSnackRecess';
            } else if (value <= time2_45) {
              return 'literacyLack';
            } else {
              return 'litSnackRecessStem';
            }
          } else {
            return 'invalidFormat';
          }
        }

        // Function to filter the object and create multiple objects based on new conditions
        function categorizeObjectByTime(inputObject) {
          var resultObject = {
            absent: {},
            literacyOnly: {},
            litAndSnack: {},
            litSnackRecess: {},
            literacyLack: {},
            litSnackRecessStem: {},
          };

          for (var key in inputObject) {
            var value = inputObject[key];

            // Check if the value matches the "H:MM" format

            // Categorize values based on new conditions
            var category = categorizeValues(value);

            // Place the key in the appropriate category object
            resultObject[category][key] = value;

          }

          return resultObject;
        }

        // Use the function to categorize values into different objects
        var categorizedResult = categorizeObjectByTime(validTimesObject);

        // Display the resulting objects


        function createNewObject(originalObject) {
          var newObject = {
            litLack: {},
            snackLack: {},
            recessLack: {},
            stemStatus: {},
          };

          for (var category in originalObject) {
            for (var key in originalObject[category]) {
              var value = originalObject[category][key];

              // Copy to all 4 categories if value is 'absent' or in specific categories
              if (value === 'absent') {
                newObject.litLack[key] = value;
              } else if (category === 'literacyOnly' || category === 'litAndSnack') {
                  newObject.litLack[key] = value;
                  newObject.snackLack[key] = value;
                  newObject.recessLack[key] = value;
                  newObject.stemStatus[key] = value;
              } else if (category === 'litSnackRecess') {
                // Copy to litLack, recessLack, and stemStatus
                newObject.litLack[key] = value;
                newObject.recessLack[key] = value;
                newObject.stemStatus[key] = value;
              } else if (category === 'literacyLack') {
                // Copy to litLack and stemStatus
                newObject.litLack[key] = value;
                newObject.stemStatus[key] = value;
              } else if (category === 'litSnackRecessStem') {
                // Copy to stemStatus
                newObject.stemStatus[key] = value;
              }
            }
          }

          return newObject;
        }

        // Use the function to create a new object with 4 categories
        var newObject = createNewObject(categorizedResult);

        // Display the resulting object
        console.log(newObject);

        function createNewNewObject(originalObject) {
          var bob = {
            litLack: {},
            snackLack: {},
            recessLack: {},
            stemStatus: {},
          };

          for (var category in originalObject) {
            for (var key in originalObject[category]) {
              var value = originalObject[category][key];

              // Apply changes based on the category
              switch (category) {
                case 'litLack':
                  bob.litLack[key] = changeLitLackValue(value);
                  break;
                case 'snackLack':
                  bob.snackLack[key] = changeSnackLackValue(value);
                  break;
                case 'recessLack':
                  bob.recessLack[key] = changeRecessLackValue(value);
                  break;
                case 'stemStatus':
                  bob.stemStatus[key] = changeStemStatusValue(value);
                  break;
                default:
                  break;
              }
            }
          }

          return bob;
        }



        // Function to change values in snackLack category
        function changeLitLackValue(value) {
          var oneHourInMinutes = 60;

          var parsedValue = convertExcelTimeToMinutes(value);

          if (!isNaN(parsedValue)) {
            if (parsedValue<75){
            var result = Math.max(parsedValue, 0);

            }else if (parsedValue>75&&parsedValue<135){
              var result= Math.max(75, 0)
            }else if (parsedValue>135){
              var result= Math.max(parsedValue-60, 0)
            }
            // Convert the result back to "H:mm" format
            return addMinutesToTime('00:00', result);
          } else {
            console.log('Invalid time format:', value);
            return 'absent';
          }
        }
        function changeSnackLackValue(value) {
          var time1_15 = '1:15';
          var result = subtractTime(value, time1_15);

          // Check if result is a valid time or 'absent'
          if (result !== 'absent') {
            // Convert minutes to "H:mm" format
            return addMinutesToTime('00:00', result);
          } else {
            return result;
          }
        }
        // Function to change values in recessLack category
        function changeRecessLackValue(value) {
          var time1_45 = '1:45';
          var result = subtractTime(value, time1_45);

          // Check if result is a valid time or 'absent'
          if (result !== 'absent') {
            // Convert minutes to "H:mm" format
            return addMinutesToTime('00:00', result);
          } else {
            return result;
          }
        }

        // Function to change values in stemStatus category
        function changeStemStatusValue(value) {
          var time2_45 = '2:45';
          var result = subtractTime(value, time2_45);

          // Check if result is a valid time or 'absent'
          if (result !== 'absent') {
            // Convert minutes to "H:mm" format
            return addMinutesToTime('00:00', result);
          } else {
            return result;
          }
        }

        // Function to subtract time values
        function subtractTime(value, subtractedTime) {
          var parsedValue = convertExcelTimeToMinutes(value);
          var parsedSubtractedTime = convertExcelTimeToMinutes(subtractedTime);

          if (!isNaN(parsedValue) && !isNaN(parsedSubtractedTime)) {
            var result = parsedValue - parsedSubtractedTime;

            // Ensure the result is a non-negative value
            result = Math.max(result, 0);

            return result;
          } else {
            
            return 'absent';
          }
        }

        function getDifferenceInMinutes(time1, time2) {
          return Math.abs(time1 - time2);
        }

        // Function to add minutes to a time value
        function addMinutesToTime(time, minutes) {
          var parsedTime = convertExcelTimeToMinutes(time);

          if (!isNaN(parsedTime)) {
            var newDate = new Date(1970, 0, 1, 0, 0);
            newDate.setMinutes(parsedTime + minutes);

            var newHours = newDate.getHours();
            var newMins = newDate.getMinutes();

            // Ensure leading zeros for single-digit hours and minutes
            var formattedHours = (newHours < 10) ? '0' + newHours : newHours;
            var formattedMins = (newMins < 10) ? '0' + newMins : newMins;

            return formattedHours + ':' + formattedMins;
          } else {
            console.log('Invalid time format:', time);
            return 'absent';
          }
        }

        // Use the function to create a new object with changed values
        var bob = createNewNewObject(newObject);

        // Display the resulting object


        function createNewNewObject(originalObject) {
          var resultArray = [];

          for (var category in originalObject) {
            var categoryObject = {};

            for (var key in originalObject[category]) {
              var value = originalObject[category][key];

              // Apply changes based on the category
              switch (category) {
                case 'litLack':
                  categoryObject[key] = changeLitLackValue(value);
                  break;
                case 'snackLack':
                  categoryObject[key] = changeSnackLackValue(value);
                  break;
                case 'recessLack':
                  categoryObject[key] = changeRecessLackValue(value);
                  break;
                case 'stemStatus':
                  categoryObject[key] = changeStemStatusValue(value);
                  break;
                default:
                  break;
              }
            }

            resultArray.push(categoryObject);
          }
          console.log(resultArray)
          return resultArray;
        }

        console.log(bob);
        function convertObjectToArray(inputObject) {
          var resultArrays = [];

          for (var category in inputObject) {
            var categoryArray = [];

            for (var key in inputObject[category]) {
              var value = inputObject[category][key];
              categoryArray.push({ key: key, value: value });
            }

            resultArrays.push(categoryArray);
          }

          return resultArrays;
        }

        // Call the function to get arrays
        var arrayOfArrays = convertObjectToArray(bob);
        createLists(arrayOfArrays);
        // Display the resulting arrays
        console.log(arrayOfArrays[0])
        function createLists(arrayOfArrays) {
          var listContainer = document.getElementById('list-container');
          listContainer.textContent = dateChosen.date

          arrayOfArrays.forEach(function (categoryArray, index) {
            // Create a new list for each category
            var newList = document.createElement('ul');
            if (index === 0) {
              newList.textContent = 'Literacy'
            }
            if (index === 1) {
              newList.textContent = 'Snack'
            }
            if (index === 2) {
              newList.textContent = 'Recess'
            }
            if (index === 3) {
              newList.textContent = 'STEM'
            }

            // Add list items for key-value pairs
            categoryArray.forEach(function (item) {
              var listItem = document.createElement('li');
              listItem.textContent = item.key + ': ' + item.value;
              newList.appendChild(listItem);
            });

            // Append the list to the container
            listContainer.appendChild(newList);
            listContainer.setAttribute("id", "list-container-full")
            var newContainer= document.createElement('div')
            newContainer.setAttribute('id', 'list-container')
            newContainer.setAttribute('class', 'date-container')
            datesSection.appendChild(newContainer)
          });
        }
      }

      // Call the function to create lists

    };
    reader.readAsArrayBuffer(file);






  } else {
    alert('Please select an Excel file');
  }










}
