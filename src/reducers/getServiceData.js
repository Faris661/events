const dataReducer = (state = [], action) => {
    switch(action.type) {
        case 'CATEGORY_LOADED':
            return {...state, categories: action.payload};
        case 'RESPONSIBILE_LOADED':
            return {...state, responsible: action.payload};
        default: return state;
    }
}

export default dataReducer;