import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDeleting,
    heroDeleted
} from '../components/heroesList/heroesSlice'

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const deleteHero = (request, heroId) => (dispatch) => {
    dispatch(heroDeleting());
    request(`http://localhost:3001/heroes/${heroId}`, 'DELETE')
        .then(data => console.log(data, "Deleted"))
        .then(dispatch(heroDeleted(heroId)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()));
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHENGED',
        payload: filter
    }
}
