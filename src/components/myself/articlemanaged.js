import React from 'react';
import {BaseTable} from 'ali-react-table';

class Articlemanaged extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    aid: 1,
                    title: '河南疫情最新情况',
                    resource: '新京报',
                    time: '2021.1.2 11:27',
                    status: '线上'
                },
                {
                    aid: 2,
                    title: '陕西各高校寒假提前半个月',
                    resource: '新闻报',
                    time: '2021.1.2 12:39',
                    status: '线下'
                },
                {
                    aid: 3,
                    title: '陕西发生重大交通事故致多人死亡',
                    resource: '新闻报',
                    time: '2021.1.5 12:39',
                    status: '线上'
                },
            ]
        }
    }

    editEvent = () => {

    }

    componentDidMount() {


    }

    render() {

        return (
            <div className={'articlelist'}>
                <table className={'articlelist-table'}>

                    <thead>
                    <tr>
                        <th scope={'col'}>序号</th>
                        <th scope={'col'}>标题</th>
                        <th scope={'col'}>来源</th>
                        <th scope={'col'}>时间</th>
                        <th scope={'col'}>状态</th>
                        <th scope={'col'}>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.list.map((value, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value.title}</td>
                                    <td>{value.resource}</td>
                                    <td>{value.time}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        <button onClick={this.editEvent}>编辑</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Articlemanaged;