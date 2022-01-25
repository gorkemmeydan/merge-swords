import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middleware = [thunk, logger];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
