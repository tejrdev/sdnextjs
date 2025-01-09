export const checkLocalStorageVariable = (variableName) => {

  if (typeof window !== "undefined") {
    // Check if localStorage is available (only runs in the browser)
    const value = localStorage.getItem(variableName);
    return value !== null;
  }

  return false;
};

