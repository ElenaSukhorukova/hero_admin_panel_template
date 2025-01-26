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

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleting = () => {
    return {
        type: 'HERO_DELETING'
    }
}

export const heroDeleted = (heroId) => {
    return {
        type: 'HERO_DELETED',
        payload: heroId
    }
}

export const heroAdded = (hero) => {
    return {
        type: 'HERO_ADDED',
        payload: hero
    }
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

// export const activeFilterChanged = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHENGED',
//             payload: filter
//         })
//     }, 1000)
// }