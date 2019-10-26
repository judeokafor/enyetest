import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();


const createAppStore = () => {
 const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware, logger)
    ));
    sagaMiddleware.run(rootSaga);
    return store;
}
export default createAppStore