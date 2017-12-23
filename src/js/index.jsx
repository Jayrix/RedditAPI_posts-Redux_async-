import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts } from './actions/actions'
import rootReducer from './reducers/reducers'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        //loggerMiddleware
    )
);


store.dispatch(selectSubreddit('reactjs'))
store
    .dispatch(fetchPosts('reactjs'))
    .then(() => console.log(store.getState()))