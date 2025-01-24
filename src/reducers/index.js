const initialState = {
    heroes: [],
    dataLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DATA_FETCHING':
            return {
                ...state,
                dataLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                dataLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHED':
        return {
            ...state,
            filters: action.payload,
            dataLoadingStatus: 'idle'
        }
        case 'HERO_DELETING':
            return {
                ...state,
                dataLoadingStatus: 'loading'
            }

        case 'HERO_DELETED':
            const filteredHeroes = state.heroes.filter(function(item) {
                return item.id !== action.payload;
            })

            return {
                ...state,
                heroes: [...filteredHeroes],
                dataLoadingStatus: 'idle'
            }
        case 'HERO_ADDED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                dataLoadingStatus: 'idle'
            }
        case 'ACTIVE_FILTER_CHENGED':
        return {
            ...state,
            activeFilter: action.payload
        }
        case 'DATA_FETCHING_ERROR':
            return {
                ...state,
                dataLoadingStatus: 'error'
            }
        default: return state
    }
}

export default reducer;