const capitalize = (str) => {
  if (str === "") {
    return "";
  } else {
    let capitalizeArr = [];
    let string = str.toLowerCase();
    for (const word of string.split(" ")) {
      capitalizeArr.push(word[0].toUpperCase() + word.slice(1));
    }
    return capitalizeArr.join(" ").trim();
  }
};

export default capitalize;
