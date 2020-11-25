export const formReducers = (state = null, actions) => {
    let temp;
    switch(actions.type) {
        case 'UPDATE_FORM': 
            temp = {...state};
            if(typeof actions.payload.value === 'object') {
                temp[actions.payload.field] = {...temp[actions.payload.field], ...actions.payload.value };
            } else {
                temp[actions.payload.field] = actions.payload.value;
            }
            return { ...temp};
        case 'INIT_FORM':
            return {...state, ...actions.payload}
        case 'SET_ERROR':
            temp = {...state};
            temp.formErrors[actions.payload.field] = actions.payload.value;
            return {...temp}
        case 'CLEAR_FORM':
            return null;
        default:
            return state;
    }
}

export default formReducers;