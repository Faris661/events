export const eventReducers = (state = [], actions) => {
    switch(actions.type) {
        case 'GET_EVENTS': 
            return {...state};
        case 'ADD_EVENT':
            return [...state, actions.payload];
        default:
            return state;
    }
}

export default eventReducers;