import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  // Add other middleware or enhancers if needed
});

sagaMiddleware.run(rootSaga);

export default store;
