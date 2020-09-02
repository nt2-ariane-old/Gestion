import React, { Component } from "react";

//Calendar
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap'
import moment from "moment";
import axios from 'axios';

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/sass/styles.scss";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import { BeatLoader } from 'react-spinners';

import EventPopup from './EventPopup'
const DraggableCalendar = withDragAndDrop(Calendar)
//popover

// import 'react-popover/lib/styles.css';

moment.locale("fr");

const localizer = momentLocalizer(moment);

export default class Calendrier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cal_events: [],
      selected_event: null,
      popoverOpen: false,
      isLoading: true
    }
  }
  componentDidMount = async () => {
    this.loadEvents()

  }
  toggle = (e) => {
    this.setState({ selected_event: e })
    this.popOver(!this.state.popoverOpen)

  }
  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
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
  renderTooltip = () => {
    return (
      <Tooltip id="button-tooltip">
        Simple tooltip
    </Tooltip>
    )
  };
  onEventDrop = (e) => {
    let prevDate = e.event
    let id = prevDate.id
    let prevStart = prevDate.start
    let prevEnd = prevDate.end
    let newStart = e.start
    let newEnd = e.end

    console.log(e)
  }
  moveEvent = ({ event, start, end }) => {
    const { cal_events } = this.state;

    const idx = cal_events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...cal_events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      cal_events: nextEvents
    });
  }
  resizeEvent = ({ event, start, end }) => {
    const { cal_events } = this.state;

    const nextEvents = cal_events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    this.setState({
      cal_events: nextEvents
    });
  };
  loadEvents = () => {
    this.setState({ isLoading: true })
    axios.get(process.env.REACT_APP_API_URL + '/events')
      .then(response => {

        let appointments = response.data;
        console.log(response.data)
        for (let i = 0; i < appointments.length; i++) {

          if (appointments[i].start.date != null) {

            appointments[i].start = moment.utc(appointments[i].start.date).toDate();
            appointments[i].end = moment.utc(appointments[i].end.date).toDate();
            appointments[i].isAllDay = true
            if (this.allDaySameDay(appointments[i].isAllDay, appointments[i].start, appointments[i].end)) {

              appointments[i].start = moment(appointments[i].start).add(4, 'hours').toDate()
              appointments[i].end = moment(appointments[i].end).add(4, 'hours').toDate()

            }
          }
          else {
            appointments[i].start = moment.utc(appointments[i].start.dateTime).toDate();
            appointments[i].end = moment.utc(appointments[i].end.dateTime).toDate();
            appointments[i].isAllDay = false
          }

          appointments[i].resourceId = appointments[i].id
          appointments[i].title = appointments[i].summary;
        }

        this.setState({
          cal_events: appointments,
          isLoading: false
        })


      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getEvent = (e) => {
    let event = this.state.cal_events.find(x => x.id === e.id);
    this.setState({ selected_event: event })

  }
  closeEvent = (e) => {
    this.setState({ selected_event: null })
  }
  createEvent = ({ event, start, end }) => {
    // axios.post(process.env.REACT_APP_API_URL + '/events')
    //   .then(response => {
    //     console.log(response)
    //     this.loadEvents()

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }
  render() {
    // const [popoverOpen, setPopoverOpen] = useState(false);


    return (

      <div className="calendar" >
        {
          this.state.isLoading ?
            <BeatLoader
              color={'#e17b42'}
              loading={this.state.isLoading}
            />
            :
            <DraggableCalendar
              localizer={localizer}
              events={this.state.cal_events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={this.toggle}
              onEventDrop={this.moveEvent}
              onEventResize={this.resizeEvent}
              onDoubleClickEvent={this.getEvent}
              onSelectSlot={this.createEvent}
              onClick={this.getEvent}
              draggableAccessor={event => true}

            />
        }
        {this.state.selected_event &&
          <EventPopup event={this.state.selected_event} closeEvent={this.closeEvent} />
        }


      </div >
    )
  }
}