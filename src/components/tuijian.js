import React from 'react';
import {Router, Route, Link} from 'react-router-dom';
import Content from './content';
import axios from 'axios'

class Tuijian extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                // {
                //     aid: 1,
                //     title: '河南疫情最新情况',
                //     resource: '新京报',
                //     time: '2021.1.2 11:27'
                // },
                // {
                //     aid: 2,
                //     title: '陕西各高校寒假提前半个月',
                //     resource: '新闻报',
                //     time: '2021.1.2 12:39'
                // },
            ]

        }
    }

    componentDidMount() {
        if (this.contentNode) {
            this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
        }
        this.callAPI();

    }

    onScrollHandle(event) {
        const clientHeight = event.target.clientHeight
        const scrollHeight = event.target.scrollHeight
        const scrollTop = event.target.scrollTop
        const isBottom = (clientHeight + scrollTop === scrollHeight)
        console.log('is bottom:' + isBottom)
    }

//`/content/${value._id}`
    callAPI = () => {
        axios.get('https://qc8vvg.fn.thelarkcloud.com/newest')
            .then((res) => {
                console.log(res);
                this.setState({
                    list: res.data.newslist
                })

            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div >
                {
                    this.state.list.map((value, key) => {
                        return (

                            <div key={key} className={'list_box'}>
                                <div className={'list_title'}>
                                    <Link target="_blank" to={`/content/${value._id}`}>{value.title}</Link>
                                </div>
                                <div className={'list_minbox'}>
                                    <a className={'list_res'}>{value.writer}</a>
                                    <a className={'list_time'}>{value.updatedAt}</a>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        )
    }

    componentWillUnmount() {
        if (this.contentNode) {
            this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
        }
    }
}

export default Tuijian;
