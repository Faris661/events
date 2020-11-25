import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { updateForm, setError } from '../actions';
import moment from 'moment';
import requiredValidator from '../shared/required-validator';

const When = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.form.date);
    const dateError = useSelector(state => state.form.formErrors && state.form.formErrors.date);
    const timeError = useSelector(state => state.form.formErrors && state.form.formErrors.time);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        switch(name) {
            case 'date':
                dispatch(updateForm('date', moment(value + ' ' + getTime()).format('YYYY-MM-DD HH:mm')));
                dispatch(setError(name, requiredValidator(value)));
                break;
            case 'time':
                let date = getDate();
                if(date === '' || date === 'Invalid date') {
                    date = moment(new Date()).format('YYYY-MM-DD');
                }
                dispatch(
                    updateForm('date', moment(date + ' ' + value).format('YYYY-MM-DD HH:mm'))
                );
                break;
            default:
                break;
        }
    }
    
    const getDate = () => {
        return selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '';
    }
    
    const getTime = () => {
        return selectedDate ? moment(selectedDate).format('HH:mm') : ''
    }

    return (
        <div className="media">
            <h2 className="media-header">When</h2>

            {/* Starts on */}
            <div className="form-group">
                <div className="form-label">Starts on*</div>
                <div className={"form-input " + (dateError ? 'error' : '')}>
                    <input onBlur={handleChange} 
                           onChange={handleChange} 
                           name="date" 
                           required
                           value={getDate()}
                           type="date"/>
                    <span className="error-message">{dateError}</span>
                </div>
                <div className={"form-input " + (timeError ? 'error' : '')}>
                    <input value={getTime()} 
                           onBlur={handleChange} 
                           onChange={handleChange} 
                           required
                           name="time" 
                           type="time"/>
                    <span className="error-message">{timeError}</span>
                </div>
            </div>

            {/* Duration */}
            <div className="form-group">
                <div className="form-label">Duration</div>
                <div className="form-input">
                    <input type="number" 
                           min="0"
                           placeholder="Number"  
                           onChange={(event) => dispatch(updateForm('duration', Number.parseInt(event.target.value, 10)))}
                           value={useSelector(state => state.form.duration)}
                           name="duration"/>
                    <span className="text-muted">hour</span>
                </div>
            </div>
        </div>
        
    )
}

export default When;