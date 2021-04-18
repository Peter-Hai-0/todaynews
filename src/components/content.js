import React from 'react';
import {Route, Link} from 'react-router-dom';
import axios from "axios";
import Comment from './comments';
import LikeBtn from './LikeBtn'
import HateBtn from './HateBtn'
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            detail: [],
            domain: 'https://qc8vvg.fn.thelarkcloud.com/query?_id=',
            title: '',
            writer: '',
            time: '',
            like: 0,
            hate: 0,
            comments: [],
        }
    }

    //处理图片链接
    getImg_url = (res) => {
        var str = res.data.result.detail;
        console.log(str);
        //var url_reg = new RegExp("(?<=https:).*(?=from=pc)");
        var pic = [];
        var tail = 0;
        var changeddetail = [];
        var len = 0;
        var i = 0;
        var str_cp;
        str_cp = res.data.result.detail;
        var h = 0;
        while (str.length > 0) {
            var item = str.match(/https:(\S*)from=pc/);
            if (item == null) break;
            pic.push(item[0]);
            tail = item.index + tail + 1;
            //console.log(item.index)
            str = str.substring(item.index + 1);
            len = item[0].length + 1;
            if (tail == 0) {
                var object = {};
                object = {img: item[0]};
                changeddetail.push(object);
                h = len;
            } else {

                var content = {};
                //console.log(h, tail - 1)
                content = {content: str_cp.slice(h, tail - 1)};
                //console.log(len,temp,h,content)
                changeddetail.push(content);

                var object = {};
                object = {img: item[0]};
                changeddetail.push(object);
                h = tail + len;
            }

            //console.log(tail, str)
        }
        if (h < str_cp.length) {
            var content = {};
            content = {content: str_cp.slice(h, str_cp.length)};
            changeddetail.push(content);
        }

        this.setState({
            detail: changeddetail
        })
        //console.log(this.state.detail)
        console.log(pic)
    }

    componentDidMount() {
        //console.log(this.props)
        this.getDetail(this.props.match.params.id);


    }

    getDetail = (id) => {
        var api = this.state.domain + id;
        axios.get(api)
            .then((res) => {
                console.log(res);
                this.setState({
                    _id: res.data.result._id,
                    hate: res.data.result.hate,
                    like: res.data.result.like,
                    title: res.data.result.title,
                    writer: res.data.result.writer,
                    time: res.data.result.createdAt,
                    comments: res.data.result.comment_id,
                    //detail:res.data.result.detail
                })
                //处理图片
                this.getImg_url(res);


            })
            .catch((err) => {
                console.log(err)
            });
        let _id = this.props.match.params.id;
        let name = document.getElementById("username_value").innerHTML;
        axios.post("https://qc8vvg.fn.thelarkcloud.com/userView", {_id: _id, name: name})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    createMarkup = (str) => {
        var html = {_html: str};
        return <div dangerouslySetInnerHTML={html}></div>
    }
    render() {

        return (
            <div>
                <h2>{this.state.title}</h2>
                <div>
                    <strong>{this.state.writer}</strong><br/>
                    {this.decodeTimeStamp(new Date(this.state.time).getTime())}
                </div>
                <div>
                    {
                        this.state.detail.map((value, key) => {
                            return (
                                <div className={'content'} key={key}>
                                    <div dangerouslySetInnerHTML={{__html: value.content}}
                                         className={'content-p'}></div>
                                    <img src={value.img}/>
                                </div>
                            )
                        })
                    }
                </div>
                <LikeBtn article_state={this.state}/>
                <HateBtn article_state={this.state}/>

                <div>
                    <Comment aid={this.state._id}/>
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

export default Content;