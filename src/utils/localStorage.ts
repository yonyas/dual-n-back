import { storageAvailable } from "./storageAvailable";

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined" && storageAvailable()) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined" && storageAvailable()) {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
};
