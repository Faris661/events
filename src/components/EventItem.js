import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { joinToEvent, removeMyEvent } from '../actions';

const EventItem = (props) => {
    const dispatch = useDispatch();
    const coordinator = useSelector(state => state.data.responsible);

    const transformDate = (dateObj) => {
        return moment(dateObj).format('YYYY-MM-DD')
    }

    const transformTime = (dateObj) => {
        return moment(dateObj).format('HH:mm')
    }

    const getCoordinator = (id) => {
        let user = coordinator.find((user) => user.id === id);
        return (user.name + ' ' + user.lastname) || '';
    }

    return (
        <div key={props.event.title} className="media">
            <h3 className="media-header">
                {props.event.title}
                <span className="float-right">
                    {transformDate(props.event.date) + ' '  + transformTime(props.event.date)}
                </span>
            </h3>
            <div>
                <strong>{props.event.description}</strong>
            </div>
            <small>
                <strong>Coordinator: </strong>{getCoordinator(props.event.coordinator.id)}
            </small>
              
            <div className="center">
                { props.isAllowedToJoin
                    ? (<button className="primary-button" 
                               onClick={() => dispatch(joinToEvent(props.event))}
                               type="button">
                        Join
                    </button>)
                    : (<button onClick={() => dispatch(removeMyEvent(props.event.title))} 
                               className="warning-button">
                        Leave event
                    </button>) 
                }
            </div>
        </div>
    )
}

export default EventItem;