export const getCategoriesData = () => {
    return async (dispatch) => {
        return await fetch('http://www.mocky.io/v2/5bcdd3942f00002c00c855ba', {method: 'GET'})
            .then(response => response.json())
            .then(json => {dispatch({type: 'CATEGORY_LOADED', payload: json})})
    }
}

export const gerResponsibilitiesData = () => {
    return async (dispatch) => {
        return await fetch('http://www.mocky.io/v2/5bcdd7992f00006300c855d5', {method: 'GET'})
            .then(response => response.json())
            .then(json => {dispatch({type: 'RESPONSIBILE_LOADED', payload: json})})
    }
}

// Form actions

export const updateForm = (field, value) => {
    return {
        type: 'UPDATE_FORM',
        payload: {field: field, value: value}
    }
}

export const initializeForm = (formConfig) => {
    return {
        type: 'INIT_FORM',
        payload: formConfig
    }
}
export const setError = (field, value) => {
    return {
        type: 'SET_ERROR',
        payload: {field, value}
    }

}

export const clearForm = () => {
    return {
        type: 'CLEAR_FORM'
    }
}

// Events actions


export const getEvents = () => {
    return {
        type: 'GET_EVENTS'
    }
}

export const addEvent = (event) => {
    return {
        type: 'ADD_EVENT',
        payload: event
    }
}


export const joinToEvent = (event) => {
    return {
        type: 'JOIN_EVENT',
        payload: event
    }
}

export const removeMyEvent = (title) => {
    return {
        type: 'REMOVE_MY_EVENT',
        payload: title
    }
}