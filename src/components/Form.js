import React from 'react';
import About from './About';
import Coordinator from './Coordinator';
import When from './When';
import Alert from './Alert';
import {useSelector, useDispatch} from 'react-redux';

import { addEvent,
         initializeForm,
         setError,
         getCategoriesData, 
         gerResponsibilitiesData,
         clearForm,
         updateForm} from '../actions';
import { useHistory } from "react-router-dom";
import emailValidator from '../shared/email-validator';
import requiredValidator from '../shared/required-validator';


function Form() {
  const dispatch = useDispatch();
  const history = useHistory();

  const form = useSelector(state => state.form);
  const events = useSelector(state => state.events);
  const responsible = useSelector(state => state.data.responsible);
  const categories = useSelector(state => state.data.categories); 

  history.listen(() => dispatch(clearForm()));
  
  const init = () => {
    if(!responsible) {
      dispatch(gerResponsibilitiesData()).then();
    }
    if(!categories) {
      dispatch(getCategoriesData());
    }

    if(!form) {
      dispatch(initializeForm(
        {
          title: '',
          description: '',
          category_id: '',
          paid_event: '',
          event_fee: '',
          reward: '',
          date: '',
          duration: '',
          coordinator: {email: '', id: ''},
          formErrors: {
            form_error: '',
            title: '',
            description: '',
            date: '',
            time: '',
            coordinator_id: '',
            coordinator_email: '',
          },
          form_submitted: false
        }
      ));
    }
  }
  init();

  const setErrorField = (field, value = '') => {
    dispatch(setError(field, value));
  }

  const isUniqueTitle = () => {
    return !events.find((item) => item.title === form.title);
  }

  const validate = (field) => {
    switch(field) {
      case 'title':
      case 'description':
      case 'date':
        setErrorField(field, requiredValidator(form[field]));
        break;
      case 'coordinator':
        setErrorField('coordinator_id', requiredValidator(form['coordinator']['id']));
        setErrorField('coordinator_email', emailValidator(form['coordinator']['email']));
        break;
      default: 
        break;
    }
  }

  const setFormSubmitted = () => {
    dispatch(updateForm('form_submitted', true));
  }
  
  const onCancel = () => {
    dispatch(clearForm());
    history.push("/");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorField('form_error', '');
    let valid = true;
    
    for(const prop in form) {
      validate(prop);
    }
    for (const prop in form.formErrors) {
      if(form.formErrors[prop]) {
        valid = false;
        break;
      }
    }

    if(!isUniqueTitle()){ 
      setErrorField('form_error', 'This event name has been already taken.');
      return;
    }
    
    if(valid) {
      onFormValid();
    } else {
      setErrorField('form_error', 'Form fulfilled incorrectly.');
    }
  }

  const onFormValid = () => {
    console.log(form)
      
    dispatch(addEvent(form));
    setFormSubmitted();
    setTimeout(() => {
      dispatch(clearForm());
      history.push("/")
    }, 2000)
  }
    
  return (
    <div>
        <form noValidate={true} onSubmit={(e) => onSubmit(e)}>
            {form && form.form_submitted 
            ? <Alert title="Success" message="Event has been created."></Alert>
            : (<div>
              <About></About>
              <Coordinator></Coordinator>
              <When></When>
              <div className="center">
                <div className="error-container">
                  <small>
                    {form && form.formErrors.form_error ? form.formErrors.form_error : null}
                  </small>
                </div>
                <button onClick={() => onCancel()} className="warning-button" type="button">Cancel</button>
                <button className="primary-button" type="submit">Publish Event</button>
              </div>
            </div>)
            }
        </form>
    </div>
  );
}
export default Form;