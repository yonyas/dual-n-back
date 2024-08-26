export function storageAvailable() {
  const localStorage = window.localStorage;
  const testKey = "__storage_test__";
  let storageAvailable = false;

  if (localStorage) {
    try {
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      storageAvailable = true;
    } catch (e) {
      storageAvailable = false;
      console.log(e);
    }
  }

  return storageAvailable;
}
