export const myEventsReducers = (state = [], actions) => {
    switch(actions.type) {
        case 'GET_MY_EVENTS': 
            return {...state};
        case 'JOIN_EVENT':
            return [...state, actions.payload];
        case 'REMOVE_MY_EVENT': 
            return [...state.filter(item => item.title !== actions.payload)]
        default:
            return state;
    }
}

export default myEventsReducers;