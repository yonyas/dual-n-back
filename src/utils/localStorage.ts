import { storageAvailable } from "./storageAvailable";

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined" && storageAvailable()) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }
};

export const getLocalStorage = <T>(key: string, defaultValue?: T): T | null => {
  if (typeof window !== "undefined" && storageAvailable()) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue ?? null;
    }
  }
  return defaultValue ?? null;
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window !== "undefined" && storageAvailable()) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }
};
