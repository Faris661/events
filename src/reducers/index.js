import {combineReducers} from 'redux';
import dataReducer from './getServiceData';
import formReducers from './formReducers';
import eventReducers from './eventReducers';
import myEventsReducers from './myEventsReducer';

const rootReducers = combineReducers({
    data: dataReducer,
    form: formReducers,
    events: eventReducers,
    myEvents: myEventsReducers
})

export default rootReducers;