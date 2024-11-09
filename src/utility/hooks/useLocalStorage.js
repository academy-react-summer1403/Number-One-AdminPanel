const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
};

const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : false;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return false;
  }
};

const getItemGeneric = (key) => {
  try {
    return localStorage.getItem(key) || false;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return false;
  }
};

const setItemGeneric = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
};

const removeItem = (key) => {
  try {
    const item = getItem(key);
    if (item === false) return false;
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
  }
};

const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

export {
  setItem,
  getItem,
  removeItem,
  clearStorage,
  setItemGeneric,
  getItemGeneric,
};
