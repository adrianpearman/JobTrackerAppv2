import  { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'

const composeEnhancers = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk),
    )
);

export default store