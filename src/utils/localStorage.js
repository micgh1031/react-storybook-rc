export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('ref__state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('ref__state', serializedState);
  } catch(err) {
    console.log(err); // eslint-disable-line
  }
};

export const saveToStorage = (key, item) => {
  try {
    localStorage.setItem(key, item);
  } catch(err) {
    console.log(err); // eslint-disable-line
  }
};

export const loadFromStorage = key => {
  try {
    const item = localStorage.getItem(key);

    if (item === null) {
      return undefined;
    }
  } catch(err) {
    console.log(err); // eslint-disable-line

    return undefined;
  }
};

export const removeFromStorage = key => {
  localStorage.removeItem(key);
};
