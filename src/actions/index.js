export const dataFetching = () => {
    return {
        type: 'DATA_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const dataFetchingError = () => {
    return {
        type: 'DATA_FETCHING_ERROR'
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
export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const heroAdded = (hero) => {
    return {
        type: 'HERO_ADDED',
        payload: hero
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHENGED',
        payload: filter
    }
}