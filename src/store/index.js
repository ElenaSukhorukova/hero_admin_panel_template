import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const stringMiddleware = () => next => action =>{
    if (typeof action === 'string') {
        return next(action);
    }

    return next(action);
}

const enhancer = store => next => action =>{
    const oldDispatch = store.dispatch;

    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            });
        }
    }

    return next(action);
}

const store = configureStore({
    reducer: {heroes, filters},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(enhancer).concat(thunk)
});

export default store;
