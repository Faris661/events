import React from 'react';
import requiredValidator from '../shared/required-validator';
import { updateForm, setError } from '../actions';
import { useSelector, useDispatch } from 'react-redux';


const About = () => {
    const dispatch = useDispatch();

    const categoriesList = useSelector(state => state.data.categories);
    const titleError = useSelector(state => state.form.formErrors && state.form.formErrors.title);
    const descriptionError = useSelector(state => state.form.formErrors && state.form.formErrors.description);

    const getCategoriesOptions = () => {
        if (!categoriesList) return;
        return categoriesList.map(function (mark, i) {
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

        dispatch(updateForm(name, value));
        switch (name) {
            case 'title':
                dispatch(setError(name, requiredValidator(value)));
                break;
            case 'description':
                dispatch(setError(name, requiredValidator(value)));
                break;
            default:
                break;
        }
    }

    return (
        <div className="media">
            <h2 className="media-header">About</h2>
            {/* TITLE */}
            <div className="form-group">
                <div className="form-label">Title*</div>
                <div className={"form-input " + (titleError ? 'error' : '')}>
                    <input type="text"
                        placeholder="Make it short and clear"
                        required
                        onChange={handleChange}
                        value={useSelector(state => state.form.title)}
                        name="title" />
                    <span className="error-message">{titleError}</span>
                </div>
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
                <div className="form-label">Description*</div>
                <div className={"form-input " + (descriptionError ? 'error' : '')}>
                    <textarea type="text" rows="4"
                        placeholder="Make it short and clear"
                        required
                        maxLength="140"
                        onChange={handleChange}
                        value={useSelector(state => state.form.description)}
                        name="description" />
                    <small className="float-right text-muted">
                        {useSelector(state => state.form.description).length || 0}/140
                    </small>
                    <span className="error-message">{descriptionError}</span>
                </div>
            </div>

            {/* CATEGORY */}
            <div className="form-group">
                <div className="form-label">Category</div>
                <div className="form-input">
                    <select onChange={(event) => dispatch(updateForm('category_id', Number.parseInt(event.target.value, 10)))}
                        value={useSelector(state => state.form.category_id)}
                        name="category_id">
                        <option value="-1">Select category</option>
                        {getCategoriesOptions()}
                    </select>
                </div>
            </div>

            {/* PAYMENT */}
            <div className="form-group">
                <div className="form-label">Payment</div>
                <div className="radio-group">

                    <input type="radio"
                        onChange={(event) => dispatch(updateForm('paid_event', false))}
                        value={false}
                        checked={useSelector(state => state.form.paid_event === false)}
                        name="paid_event" />
                    <label>Free event</label>

                    <input type="radio"
                        onChange={(event) => dispatch(updateForm('paid_event', true))}
                        value={true}
                        checked={useSelector(state => state.form.paid_event === true)}
                        name="paid_event" />
                    <label>Paid event</label>

                </div>
            </div>
            {/* Reward */}
            <div className="form-group">
                <div className="form-label">Reward</div>
                <div className="form-input">
                    <input type="number"
                        min="0"
                        placeholder="Number"
                        onChange={(event) => dispatch(updateForm('reward', Number.parseInt(event.target.value, 10)))}
                        value={useSelector(state => state.form.reward)}
                        name="reward" />
                    <span className="text-muted">reward points for arrendance</span>
                </div>
            </div>
        </div>
    )
}

export default About;