// **** (1) createStore 와 루트 리듀서 불러오기
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import rootReducer from 'store/modules';

// **** 리덕스 개발자도구 적용
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ReduxThunk, ReduxLogger)
));

export default store;