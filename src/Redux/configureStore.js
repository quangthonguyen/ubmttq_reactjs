import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import monitorReducersEnhancer from './enhancers/monotorReducers';
// import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import mySaga from '../ReduxSaga';
const sagaMiddleware = createSagaMiddleware();

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: []
    // devTools: false
  });
  sagaMiddleware.run(mySaga);
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }
  return store;
}
