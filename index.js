// Based on twitter: http://nicolasgallagher.com/redux-modules-and-code-splitting/
// and https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application
const { combineReducers, createStore } = require('redux');

class ReducerRegistry {
  constructor() {
    this._emitChange = null;
    this._reducers = {};
  }

  getReducers() {
    return { ...this._reducers };
  }

  register(name, reducer) {
    this._reducers = { ...this._reducers, [name]: reducer };
    if (this._emitChange) {
      this._emitChange(this.getReducers());
    }
  }

  setChangeListener(listener) {
    if (this._emitChange != null) {
      throw new Error('Can only set the listener for a ReducerRegistry once.')
    }
    this._emitChange = listener;
  }
}

module.exports = ReducerRegistry;

// // Preserve initial state for not-yet-loaded reducers
// const combine = (reducers) => {
//   const reducerNames = Object.keys(reducers);
//   Object.keys(initialState).forEach(item => {
//     if (reducerNames.indexOf(item) === -1) {
//       reducers[item] = (state = null) => state;
//     }
//   });
//   return combineReducers(reducers);
// };

const reducerRegistry = new ReducerRegistry();
const store = createStore(()=>{}, {});
// Replace the store's reducer whenever a new reducer is registered.
reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combineReducers(reducers));
});

module.exports = {store, reducerRegistry};
