import React, { Component } from 'react'

import moment from 'moment';

var frLocale = require('moment/locale/fr');
moment.locale('fr', frLocale);


export default class EventShow extends Component {
    sameDay(date1, date2) {
        return moment(date1).isSame(date2, 'day');
    }
    allDaySameDay(isAllDay, date1, date2) {
        if (isAllDay) {
            var temp = moment(date1, "DD-MM-YYYY").add(1, 'days');
            return this.sameDay(temp, date2);
        }
        else {
            return this.sameDay(date1, date2)
        }
    }
    render() {
        const { event } = this.props
        return (

            <div className='event-show'>
                {
                    event.title !== "" ?
                        <div>
                            <a href={event.htmlLink}><h2>{event.title}</h2></a>
                            <div className='event-summary' dangerouslySetInnerHTML={{ __html: event.summary }} />
                            {
                                this.allDaySameDay(event.isAllDay, event.start, event.end) ?
                                    <div className='event-dates'>
                                        <div>
                                            {moment(event.end).format('LL')}
                                        </div>
                                        {
                                            !event.isAllDay ?
                                            < div >
                                                {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
                                            </div>
                                            :
                                            <div>
                                                Toute la journée
                                            </div>
                                        }
                                    </div>
                                    :
                                    <div className='event-dates'>
                                        <div>
                                            {moment(event.start).format('LLLL')}
                                        </div>
                                        < div >
                                            {moment(event.end).format('LLLL')}
                                        </div>
                                    </div>

                            }
                            {event.organizer &&
                                <div className='event-creation'>
                                    <p>{event.organizer.displayName}</p>
                                    <p>Crée par : {event.creator.email}</p>
                                </div>
                            }
                        </div>
                        :
                        "Loading..."
                }

            </div>
        )
    }
}