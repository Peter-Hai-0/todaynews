import React from 'react';
import {Router, Route, Link} from 'react-router-dom';
import Content from './content';
import axios from 'axios'
import ReactPullToRefresh from 'react-pull-to-refresh'

class Tuijian extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            news_num: 15


        }
    }

    componentDidMount() {

        this.callAPI();

    }

//`/content/${value._id}`
    callAPI = () => {
        axios.get('https://qc8vvg.fn.thelarkcloud.com/newest_', {params: {pageNum: 0, pageSize: 15}})
            .then((res) => {
                for (var i = 0; i < res.data.newslist.length; i++) {
                    res.data.newslist[i].createdAt = this.decodeTimeStamp(new Date(res.data.newslist[i].createdAt).getTime())
                    if (res.data.newslist[i].comment_id == undefined) res.data.newslist[i].comment_id = 0
                    else res.data.newslist[i].comment_id = eval('([' + res.data.newslist[i].comment_id + '])').length
                    if (res.data.newslist[i].title.length > 37) res.data.newslist[i].title = res.data.newslist[i].title.substring(0, 36) + '...'
                }
                this.setState({
                    list: res.data.newslist
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    loadmore = () => {
        this.state.news_num = 3 + this.state.news_num
        axios.get('https://qc8vvg.fn.thelarkcloud.com/newest_', {params: {pageNum: 0, pageSize: this.state.news_num}})
            .then((res) => {
                for (var i = 0; i < res.data.newslist.length; i++) {
                    res.data.newslist[i].createdAt = this.decodeTimeStamp(new Date(res.data.newslist[i].createdAt).getTime())
                    if (res.data.newslist[i].comment_id == undefined) res.data.newslist[i].comment_id = 0
                    else res.data.newslist[i].comment_id = eval('([' + res.data.newslist[i].comment_id + '])').length
                    if (res.data.newslist[i].title.length > 37) res.data.newslist[i].title = res.data.newslist[i].title.substring(0, 36) + '...'
                }
                // console.log(res)
                this.setState({
                    list: res.data.newslist
                })

            })
            .catch((err) => {
                alert("没有更多")
            })
    }


    render() {
        return (
            <div>
                {/*<button onClick={()=>{alert(this.state.pageNum)}}>show</button>*/}
                {
                    this.state.list.map((value, key) => {
                        return (

                            <div key={key} className={'list_box'}>
                                <div className={'list_title'}>
                                    <Link target="_self" to={`/content/${value._id}`}>{value.title}</Link>
                                </div>
                                <div className={'list_minbox'}>
                                    <small className={'list_res_'}>{value.writer}</small>
                                    &nbsp;&nbsp;&nbsp;
                                    <small className={'list_time'}>{value.createdAt}</small>
                                    &nbsp;
                                    &nbsp;&nbsp;&nbsp;
                                    <small>{value.comment_id}评论</small>
                                    &nbsp;&nbsp;&nbsp;
                                    <small className={'edit-like'}>☺{value.like}</small>
                                    &nbsp;&nbsp;&nbsp;
                                    <small className={'edit-like'}>☹{value.hate}</small>
                                    &nbsp;&nbsp;&nbsp;
                                    {/*&nbsp;&nbsp;&nbsp;<small>👍{value.like.length}</small>*/}

                                    {/*{value.hate}*/}
                                </div>
                                <br/>
                            </div>

                        )
                    })
                }
                <div id={"nextpage"}>
                    <small onClick={this.loadmore} style={{cursor: 'pointer', color: 'blue'}}>⟳加载更多</small>
                </div>
            </div>
        )
    }

    decodeTimeStamp = (timestamp) => {
        var arrTimestamp = (timestamp + '').split('');
        for (var start = 0; start < 13; start++) {
            if (!arrTimestamp[start]) {
                arrTimestamp[start] = '0';
            }
        }
        timestamp = arrTimestamp.join('') * 1;

        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - timestamp;

        // 如果本地时间反而小于变量时间
        if (diffValue < 0) {
            return '不久前';
        }

        // 计算差异时间的量级
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;

        // 数值补0方法
        var zero = function (value) {
            if (value < 10) {
                return '0' + value;
            }
            return value;
        };

        // 使用
        if (monthC > 12) {
            // 超过1年，直接显示年月日
            return (function () {
                var date = new Date(timestamp);
                return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
            })();
        } else if (monthC >= 1) {
            return parseInt(monthC) + "月前";
        } else if (weekC >= 1) {
            return parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            return parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            return parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            return parseInt(minC) + "分钟前";
        }
        return '刚刚';
    }
}

export default Tuijian;
