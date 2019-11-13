import axios from "axios";

export const onInputHandler = (e, state) => {
  const id = e.target.id;
  let content = e.target.value;
  // returns values from the select input as boolean
  if (content === "false") {
    content = false;
  }
  if (content === "true") {
    content = true;
  }
  return { [id]: content };
};

export const onClickHandler = state => {
  const existingContent = state;
  let newContentObject = {};
  // prunes the existing object for values that are not filled in
  Object.keys(existingContent).forEach(function(key) {
    if (existingContent[key] !== "") {
      let newKey = key;
      let newValues = existingContent[key];
      newContentObject[newKey] = newValues;
      return newContentObject;
    }
  });
  console.log(newContentObject);
  axios
    .put("/api/data/single", newContentObject)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
};
