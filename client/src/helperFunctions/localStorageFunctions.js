const localStorageName = "my-test-app-currentUser";

export const fetchLocalStorage = () => {
  const localString = localStorage.getItem(localStorageName);
  const localJSON = JSON.parse(localString);
  return localJSON;
};
export const setLocalStorage = (value) => {
  localStorage.setItem(localStorageName, JSON.stringify(value));
};
export const deleteLocalStorage = () => {
  localStorage.setItem(localStorageName, null);
};
