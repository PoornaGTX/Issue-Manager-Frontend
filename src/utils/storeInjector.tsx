import { Store } from 'redux';

let store: Store | undefined;

export const injectStore = (_store: Store) => {
  store = _store;
};

export const getStore = () => {
  return store;
};
