import React from 'react';
import {Router, Route, Link} from 'react-router-dom';
import axios from 'axios'
import login from "./login";
import like_1 from '../assets/images/like_1.png';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "choose",
            article: {_id: "", title: "", writer: "", detail: ""},
            list: []
        }
    }

    componentDidMount() {
        document.getElementById("tab").style.visibility = "hidden"
    }

    handleclicked = (_id) => {
        axios.get('https://qc8vvg.fn.thelarkcloud.com/query?_id=' + _id)
            .then((res) => {
                this.setState({
                    view: "edit",
                    article: {
                        _id: res.data.result._id,
                        title: res.data.result.title,
                        writer: res.data.result.writer,
                        detail: res.data.result.detail
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
    updatenews = () => {
        let _id = this.state.article._id;
        axios.patch("https://qc8vvg.fn.thelarkcloud.com/userNews", {
            _id: _id,
            title: document.getElementById("biaoti").value,
            writer: document.getElementById("laiyuan").value,
            detail: document.getElementById("neirong").value
        })
            .then((res) => {
                if (res.request.status == 200)
                    alert("修改成功");
            })
            .catch((err) => {
                alert("修改失败");
            })
    }

    handleChange(e) {
        this.setState({
            article: {
                _id: this.state.article._id,
                title: this.refs.title.value,
                writer: this.refs.writer.value,
                detail: this.refs.detail.value
            }
        });
    }

    //获取文章列表
    componentDidMount() {
        axios.get('https://qc8vvg.fn.thelarkcloud.com/userNews?name=' + this.props.match.params.name)
            .then((res) => {
                console.log(res);
                this.setState({
                    list: res.data.news
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        //编辑界面
        if (this.state.view == "edit") return (
            <div className={"edit_article"}>
                <button onClick={() => {
                    this.setState({view: "choose"})
                }}>返回列表
                </button>
                <h2>编辑新闻</h2>

                <label>标题</label><input id={"title_id"} type={"text"} id={"biaoti"} ref={"title"}
                                        value={this.state.article.title} onChange={this.handleChange.bind(this)}/>
                <br/>
                <label>来源</label><input type={"text"} id={"laiyuan"} ref={"writer"} value={this.state.article.writer}
                                        onChange={this.handleChange.bind(this)}/>
                <br/>
                <textarea name={"detail"} id={"neirong"} ref={"detail"} placeholder={"请在此处输入内容"}
                          onChange={this.handleChange.bind(this)}
                          value={this.state.article.detail}/>
                <div>
                    <button onClick={this.updatenews}>提交</button>
                </div>
            </div>
        )
        //文章列表界面
        else if (this.state.view == "choose") {
            if (this.state.list.length == 0) {
                return (
                    <div>
                        <h2 className={'edit-listno'}>您还没发布文章，快来分享身边有趣的事吧！</h2>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h2>我的文章列表:</h2>
                        {
                            this.state.list.slice().reverse().map((value, key) => {
                                return (
                                    <div key={key} className={'edit-list'}>
                                        <li onClick={this.handleclicked.bind(this, value._id)}>{value.title}</li>
                                        <small
                                            className={'edit-time'}>发布于{this.decodeTimeStamp(new Date(value.createdAt).getTime())}</small>
                                        &nbsp;&nbsp;&nbsp;
                                        <small className={'edit-like'}>☺{value.like}</small>
                                        &nbsp;&nbsp;&nbsp;
                                        <small className={'edit-like'}>☹{value.hate}</small>
                                        &nbsp;&nbsp;&nbsp;
                                        <small className={'edit-like'}>{eval('([' + value.comment_id + '])').length}评论
                                        </small>
                                        &nbsp;&nbsp;&nbsp;

                                        {/*<img src={like_1}/>*/}
                                        <br/>
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div>)
            }

        }

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

export default Edit;