function useLocalstorage() {
  function getItem(key) {
    return localStorage.getItem(key);
  }
  function setItem(key, value) {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  }

  function removeItem(key) {
    localStorage.removeItem(key);
  }

  function clearAllItem() {
    localStorage.clear();
  }

  return { getItem, setItem, removeItem, clearAllItem };
}

export default useLocalstorage;
