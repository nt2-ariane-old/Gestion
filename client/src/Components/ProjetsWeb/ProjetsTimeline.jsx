import React, { Component } from 'react'

import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import apis from '../../api/api'
import errorHandler from '../../tools/errorHandler'
export default class ProjetsTimeline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: [{ _id: 1 }],
            items: [],
        }
    }
    componentDidMount = () => {
        this.loadComponent()
    }
    componentDidUpdate = (prevProps, prevStates) => {
        if (prevProps.projets != this.props.projets) {
            this.loadComponent()
        }
    }
    loadComponent = () => {
        this.setState({ groups: this.props.projets })
        apis.getAllTasks().then((res) => {
            res = res.data.map((value) => {
                value.start_time = moment(new Date(value.start_time))
                value.end_time = moment(new Date(value.end_time))
                return value
            })
            this.setState({ items: res })
        }).catch((e) => console.log(errorHandler(e)))

    }

    onCanvasDoubleClick = async (groupId, time, e) => {
        let date = new Date(time);
        date.setHours(date.getHours() + 1);

        apis
            .insertTask({ group: groupId, title: 'item 1', start_time: time, end_time: date.getTime() })
            .then((res) => this.loadComponent())

    }
    onItemResize = async (itemId, time, edge) => {
        console.log(time)
        console.log(edge)
        const item = this.state.items.find(element => element._id === itemId)
        let start_time = item.start_time
        let end_time = item.end_time
        if (edge === 'left') {
            start_time = time
        }
        else {
            end_time = time
        }
        apis
            .updateTaskById(itemId, { group: item.group, title: 'item 1', start_time: start_time, end_time: end_time })
    }
    onItemMove = (itemId, dragTime, newGroupOrder) => {
        console.log(dragTime)
        console.log(newGroupOrder)
        const item = this.state.items.find(element => element._id === itemId)
        const diff = item.end_time - item.start_time
        let start_time = dragTime
        let end_time = dragTime + diff
        console.log(new Date(start_time))
        console.log(new Date(end_time))
        apis
            .updateTaskById(itemId, { group: newGroupOrder, title: 'item 1', start_time: start_time, end_time: end_time })
            .then((res) => { this.loadComponent() })
            .catch((err) => console.log(errorHandler(err)))
    }
    render() {
        const { groups, items } = this.state

        // let items = []
        // let groups = []
        // if (this.state.groups) {

        // const groups = [{ _id: 1, title: 'group 1' }, { _id: 2, title: 'group 2' }]
        // const items = [
        //     {
        //         _id: 1,
        //         group: groups[0]._id,
        //         title: 'item 1',
        //         start_time: moment(),
        //         end_time: moment().add(1, 'hour')
        //     },
        //     {
        //         _id: 2,
        //         group: groups[0]._id,
        //         title: 'item 2',
        //         start_time: moment().add(-0.5, 'hour'),
        //         end_time: moment().add(0.5, 'hour')
        //     },
        //     {
        //         _id: 3,
        //         group: groups[0]._id,
        //         title: 'item 3',
        //         start_time: moment().add(2, 'hour'),
        //         end_time: moment().add(3, 'hour')
        //     }
        // ]
        // }
        return (
            <div>
                {
                    groups &&
                    // <Timeline groups={groups}
                    //     items={items}
                    //     // keys={
                    //     //     {
                    //     //         groupIdKey: '_id',
                    //     //         itemIdKey: 'id',
                    //     //         groupTitleKey: 'title',
                    //     //         itemTitleKey: 'title',
                    //     //         itemTimeStartKey: 'start_time',
                    //     //         itemTimeEndKey: 'end_time'

                    //     //     }
                    //     // }

                    //     defaultTimeStart={moment().add(-12, 'hour')}
                    //     defaultTimeEnd={moment().add(12, 'hour')}
                    //     onCanvasDoubleClick={this.onCanvasDoubleClick}
                    // />

                    <Timeline
                        groups={groups}
                        items={items}

                        keys={{
                            groupIdKey: '_id',
                            groupTitleKey: 'title',
                            groupRightTitleKey: 'rightTitle',
                            itemIdKey: '_id',
                            itemTitleKey: 'title',
                            itemDivTitleKey: 'title',
                            itemGroupKey: 'group',
                            itemTimeStartKey: 'start_time',
                            itemTimeEndKey: 'end_time',
                        }}

                        defaultTimeStart={moment().add(-12, 'hour')}
                        defaultTimeEnd={moment().add(12, 'hour')}

                        onCanvasDoubleClick={this.onCanvasDoubleClick}
                        onItemResize={this.onItemResize}
                        onItemMove={this.onItemMove}
                    />
                }
            </div >
        )
    }
}
