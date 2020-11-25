import React from 'react';
import requiredValidator from '../shared/required-validator';
import emailValidator from '../shared/email-validator';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm, setError } from '../actions';


const Coordinator = () => {
    const dispatch = useDispatch();
    const responsibleList = useSelector(state => state.data.responsible);

    const coordinatorError = useSelector(state => state.form.formErrors && state.form.formErrors.coordinator_id);
    const emailError = useSelector(state => state.form.formErrors && state.form.formErrors.coordinator_email);
    const coordinator = useSelector(state => state.form.coordinator);

    const getResponsibleOptions = () => {
        if (!responsibleList) return;
        return responsibleList.map(function (mark, i) {
            return <option
                key={mark.id}
                value={mark.id}>
                {mark.name}
            </option>
        });
    }

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case 'coordinator_id':
                dispatch(setError(name, requiredValidator(value)));
                dispatch(updateForm('coordinator', { ...coordinator, id: (value ? Number.parseInt(value, 10) : '') }));
                break;
            case 'coordinator_email':
                dispatch(setError(name, emailValidator(value)));
                dispatch(updateForm('coordinator', { ...coordinator, email: value }));
                break;
            default:
                break;
        }
    }

    return (
        <div className="media">
            <h2 className="media-header">Coordinator</h2>

            {/* RESPONSIBLE */}
            <div className="form-group">
                <div className="form-label">Responsible*</div>
                <div className={"form-input " + (coordinatorError ? 'error' : '')}>
                    <select onChange={handleChange}
                        required
                        value={coordinator.id}
                        name="coordinator_id">
                        <option value="">Select category</option>
                        {getResponsibleOptions()}
                    </select>
                    <span className="error-message">{coordinatorError}</span>
                </div>
            </div>

            {/* EMAIL */}
            <div className="form-group">
                <div className="form-label">Email</div>
                <div className={"form-input " + (emailError ? 'error' : '')}>
                    <input type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleChange}
                        value={coordinator.email}
                        name="coordinator_email" />
                    <span className="error-message">{emailError}</span>
                </div>
            </div>
        </div>
    )
}

export default Coordinator;