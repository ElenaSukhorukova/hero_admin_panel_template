import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDeleting,
    heroDeleted
} from '../components/heroesList/heroesSlice'

import {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
} from '../components/heroesFilters/filtersSlice'

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