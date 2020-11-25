import React from 'react';

const Alert = (props) => {
    return (
        <div className="success-alert">
            <h3 className="headline">{props.title}</h3>
            <p className="text-muted"> {props.message}</p>
        </div>
    )
}

export default Alert;