const monthData = [
  {
    value: 1,
    month: "January",
  },
  {
    value: 2,
    month: "February",
  },
  {
    value: 3,
    month: "March",
  },
  {
    value: 4,
    month: "April",
  },
  {
    value: 5,
    month: "May",
  },
  {
    value: 6,
    month: "June",
  },
  {
    value: 7,
    month: "July",
  },
  {
    value: 8,
    month: "August",
  },
  {
    value: 9,
    month: "September",
  },
  {
    value: 10,
    month: "October",
  },
  {
    value: 11,
    month: "November",
  },
  {
    value: 12,
    month: "December",
  },
];

const dayData = [];
const yearData = [];

for (let i = 1; i <= 31; i++) {
  dayData.push(i);
}

for (let j = 2000; j <= 2035; j++) {
  yearData.push(j);
}

export default {
  months: monthData,
  day: dayData,
  year: yearData,
};
