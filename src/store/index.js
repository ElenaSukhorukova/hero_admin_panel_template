import { configureStore } from '@reduxjs/toolkit';

import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = () => next => action =>{
    if (typeof action === 'string') {
        return next(action);
    }

    return next(action);
}

const store = configureStore({
    reducer: {heroes, filters, [apiSlice.reducerPath]: apiSlice.reducer},
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware)
});

export default store;
