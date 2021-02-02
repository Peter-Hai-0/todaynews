import React from 'react';
import {Router, Route, Link} from 'react-router-dom';
import Content from './content';
import axios from 'axios'

class Tuijian extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    aid: 1,
                    title: '河南疫情最新情况',
                    resource: '新京报',
                    time: '2021.1.2 11:27'
                },
                {
                    aid: 2,
                    title: '陕西各高校寒假提前半个月',
                    resource: '新闻报',
                    time: '2021.1.2 12:39'
                },
            ]

        }
    }

    componentDidMount() {
        this.callAPI();

    }

    callAPI = () => {
        axios.get('https://qc8vvg.fn.thelarkcloud.com/query?_id=6017fbb1c280fd0041e06074')
            .then((res) => {
                console.log(res);

            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.list.map((value, key) => {
                        return (

                            <div key={key} className={'list_box'}>
                                <div className={'list_title'}>
                                    <Link target="_blank" to={`/content/${value.aid}`}>{value.title}</Link>
                                </div>
                                <div className={'list_minbox'}>
                                    <a className={'list_res'}>{value.resource}</a>
                                    <a className={'list_time'}>{value.time}</a>
                                </div>
                                <Route exact path="/content:aid" component={Content}/>
                            </div>

                        )
                    })
                }
            </div>
        )
    }
}

export default Tuijian;
