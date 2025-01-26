import { configureStore } from '@reduxjs/toolkit';

import heroes from '../components/heroesList/heroesSlice';
import filters from '../reducers/filters';

const stringMiddleware = () => next => action =>{
    if (typeof action === 'string') {
        return next(action);
    }

    return next(action);
}

const store = configureStore({
    reducer: {heroes, filters},
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware)
});

export default store;
