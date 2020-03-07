const capitalize = str => {
  let capitalizeArr = [];
  for (const word of str.split(" ")) {
    capitalizeArr.push(word[0].toUpperCase() + word.slice(1));
  }
  return capitalizeArr.join(" ").trim();
};

export default capitalize;
