
const isClient = typeof window !== 'undefined';
const localStorageIsAvailable = 
isClient && typeof window.localStorage !== 'undefined';

export function saveToLocalStorage(key, value) {
  if (!localStorageIsAvailable) return;
  window.localStorage.setItem(key, value);
}

export function readFromLocalStorage(key) {
  if (!localStorageIsAvailable) return null;
  return window.localStorage.getItem(key);
}

export function removeFromLocalStorage(key) {
  if (!localStorageIsAvailable) return;
  window.localStorage.removeItem(key);
}