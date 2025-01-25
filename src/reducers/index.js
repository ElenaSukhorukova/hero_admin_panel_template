const initialState = {
    heroes: [],
    dataLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
    filteredHeroes: []
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
                filteredHeroes: state.activeFilter === "all" ?
                    action.payload : action.payload.filter(hero => hero.element === state.activeFilter),
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
            });

            return {
                ...state,
                heroes: [...filteredHeroes],
                filteredHeroes: state.activeFilter === "all" ?
                    filteredHeroes : filteredHeroes.filter(hero => hero.element === state.activeFilter),
                dataLoadingStatus: 'idle'
            }
        case 'HERO_ADDED':
            const newHeroesList = [...state.heroes, action.payload];

            return {
                ...state,
                heroes: newHeroesList,
                filteredHeroes: state.activeFilter === "all" ?
                    newHeroesList : newHeroesList.filter(hero => hero.element === state.activeFilter),
                dataLoadingStatus: 'idle'
            }
        case 'ACTIVE_FILTER_CHENGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === "all" ?
                    state.heroes : state.heroes.filter(hero => hero.element === action.payload),
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