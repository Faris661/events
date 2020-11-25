import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EventItem from './EventItem';

const Dashboard = () => {
    const events = useSelector(state => state.events);
    const myEvents = useSelector(state => state.myEvents);

    const filterEvents = (list) => {
        return list.filter(element => !myEvents.find(item => item.title === element.title)) || [];
    }

    const getEvents = (list, isAllowedToJoin) => {
        return list.map(event =>
            <EventItem key={event.title}
                isAllowedToJoin={isAllowedToJoin}
                event={event}>
            </EventItem>
        )
    }

    return (
        <div>
            <h3 className="main-header">My events</h3>
            <div>
                {(myEvents && myEvents.length > 0)
                    ? getEvents(myEvents, false)
                    : (<div className="media center">
                        <span className="media-header">You are not signed in to any event</span>
                    </div>)
                }
            </div>

            <h3 className="main-header">Available events</h3>
            <div>
                {filterEvents(events).length > 0
                    ? getEvents(filterEvents(events), true)
                    : (<div className="media center">
                        <span className="media-header">No events availeable</span>
                    </div>)
                }
                <div className="center">
                    <Link to="/create">
                        <button className="primary-button"
                            type="button">
                            Create Event
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;


