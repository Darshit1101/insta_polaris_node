// src/redux/store.js
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
// import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./ducks";
import sagas from "./sagas"; // Ensure this path is correct

const sagaMiddleware = createSagaMiddleware();

// const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware))
// );

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;
