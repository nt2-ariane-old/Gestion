import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
import apis from '../../../api/api'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import errorHandler from '../../../tools/errorHandler'
export default class TaskPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            start_time: new Date(),
            end_time: new Date(),
            group: null
        }
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleStartTimeChange = start_time => this.setState({ start_time })
    handleEndTimeChange = end_time => this.setState({ end_time })
    handleAutocompleteChange = (e, value) => {
        this.setState({ group: value })
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const { title, start_time, end_time, group } = this.state
        apis
            .insertTask({ group: group._id, title: title, start_time: start_time.valueOf, end_time: end_time.valueOf })
            .then((res) => console.log(res))
            .catch(e => errorHandler(e))
    }
    componentDidMount = () => {
        if (this.props.addInfo) {
            const group = this.props.groups.find(value => value._id === this.props.addInfo.groupId)
            this.setState({ start_time: new Date(this.props.addInfo.time), group: group })
        }
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.addInfo !== this.props.addInfo) {
            const group = this.props.groups.find(value => value._id === this.props.addInfo.groupId)
            this.setState({ start_time: new Date(this.props.addInfo.time), group: group })
        }

    }
    render() {
        const { groups, addInfo: { time, group } } = this.props
        return (
            <div className='task-popup'>
                <form onSubmit={this.handleSubmit} className='task-popup-form'>
                    <label>
                        <span className='title' > Nom : </span>
                        <input type="text" value={this.state.title} onChange={this.handleChange} />
                    </label>
                    <label>
                        <span className='title'>Date de début :</span>

                        <DateTimePicker
                            onChange={this.handleStartTimeChange}
                            value={this.state.start_time}
                        />
                    </label>
                    <label>
                        <span className='title'>  Date de fin :</span>

                        <DateTimePicker
                            onChange={this.handleEndTimeChange}
                            value={this.state.end_time}
                        />
                    </label>
                    <label>
                        <span className='title'> Groupe : </span>
                        {this.props.groups &&
                            <Autocomplete
                                id="combo-box-groups"
                                options={this.props.groups}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 300 }}
                                value={this.state.group}
                                onChange={this.handleAutocompleteChange}
                                renderInput={(params) => <TextField {...params} label="Combo box" value={params} variant="outlined" /> }
                            />
                        }
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>
            </div >
        )
    }
}
