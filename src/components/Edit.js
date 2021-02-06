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
                            this.state.list.map((value, key) => {
                                return (
                                    <div key={key} className={'edit-list'}>
                                        <li onClick={this.handleclicked.bind(this, value._id)}>{value.title}</li>
                                        <a className={'edit-time'}>{value.createdAt}</a>
                                        <a className={'edit-like'}>{value.like}</a>
                                        <img src={like_1}/>
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
}

export default Edit;