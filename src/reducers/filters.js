const initialState = {
    filters: [],
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'ACTIVE_FILTER_CHENGED':
            return {
                ...state,
                activeFilter: action.payload
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        default: return state
    }
}

export default filters;