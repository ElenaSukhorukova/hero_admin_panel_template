import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: [],
  activeFilter: 'all',
  filtersLoadingStatus: 'idle'
}

const filtersSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
        },
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload},
        filtersFetchingError: state => {state.filtersLoadingStatus = 'error'}
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {
  filtersFetching,
  filtersFetched,
  activeFilterChanged,
  filtersFetchingError
} = actions;