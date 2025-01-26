import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state => {
            state.heroesLoadingStatus = 'error';
        },
        heroDeleting: state => {
            state.heroesLoadingStatus = 'loading';
        },
        heroDeleted: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = state.heroes.filter((item) => item.id !== action.payload);
        },
        heroAdded: (state, action) => {
            state.heroes.push(action.payload);
        }
    }
});

const {actions, reducers} = heroesSlice;

export default reducers;

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDeleting,
    heroDeleted,
    heroAdded
} = actions;