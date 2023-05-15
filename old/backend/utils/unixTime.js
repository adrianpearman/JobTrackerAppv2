const unixTime = (month, year) => {
  month = month.toString();
  year = year.toString();
  let date = `${year}.${month}.01`;
  return new Date(date).getTime();
};

module.exports = unixTime;
