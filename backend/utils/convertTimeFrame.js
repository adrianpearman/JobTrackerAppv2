const convertTimeFrame = date => {
  let month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(parseInt(date))
  );
  let year = new Date(parseInt(date)).getFullYear();
  let timeframe = `${month} ${year}`;
  return timeframe;
};

module.exports = convertTimeFrame;
