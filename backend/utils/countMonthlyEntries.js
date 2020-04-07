//  Count all of the monthly applications
const convertTimeFrame = require("./convertTimeFrame");
const unixTime = require("./unixTime");

const countMonthlyEntries = (arr, recruiter) => {
  // Base Variables
  let applicationMonths = {};
  let dataContainer = [];
  let baseUnix = unixTime("05", "2017");
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  let unix = unixTime(month, year);

  // Initialize Application Month
  const initApplicationMonth = () => {
    if (unix > baseUnix) {
      unix = unixTime(month, year);
      applicationMonths[unix] = 0;
      month--;
      if (month === 0) {
        month = 12;
        year = year - 1;
      }
      return initApplicationMonth();
    } else {
      return;
    }
  };
  initApplicationMonth();

  if (recruiter === true) {
    //Seperate all of the values by the application date
    for (let i = 0; i < arr.length; i++) {
      applicationMonths[arr[i].recruiterDate]++;
    }
    // convert the value from an object to an array
    for (let key in applicationMonths) {
      if (applicationMonths.hasOwnProperty(key)) {
        let data = {
          date: new Date(parseInt(key)),
          name: convertTimeFrame(key),
          value: applicationMonths[key]
        };
        dataContainer.push(data);
      }
    }
    return dataContainer;
  } else {
    //Seperate all of the values by the application date
    for (let i = 0; i < arr.length; i++) {
      applicationMonths[arr[i].applicationDate]++;
    }
    // convert the value from an object to an array
    for (let key in applicationMonths) {
      if (applicationMonths.hasOwnProperty(key)) {
        let data = {
          date: new Date(parseInt(key)),
          name: convertTimeFrame(key),
          value: applicationMonths[key]
        };
        dataContainer.push(data);
      }
    }
    return dataContainer;
  }
};

module.exports = countMonthlyEntries;
