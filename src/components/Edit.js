import React from 'react';
import {Router, Route, Link} from 'react-router-dom';
import axios from 'axios'

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "choose",
            article: {title: "", writer: "", detail: ""}
        }
    }

    componentDidMount() {
        document.getElementById("tab").style.visibility = "hidden"
    }

    handleclicked = (_id) => {
        axios.get("https://qc8vvg.fn.thelarkcloud.com/query?_id=" + _id)
            .then((res) => {
                this.setState({view: "edit",
                    article: {
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
        alert("修改成功")
    }


    render() {
        //编辑界面
        if (this.state.view == "edit") return (
            <div className={"edit_article"}>
                <h2>编辑新闻</h2>
                <h3 id={"succ_add"}></h3>

                <label>标题</label><input id={"title_id"} type={"text"} ref={"title"} value={this.state.article.title}/>
                <br/>
                <label>来源</label><input type={"text"} id={"laiyuan"} ref={"writer"} value={this.state.article.writer}/>
                <br/>
                <textarea name={"detail"} id={"detail"} ref={"detail"} placeholder={"请在此处输入内容"}
                          value={this.state.article.detail}/>
                <div>
                    <button onClick={this.updatenews}>提交</button>
                </div>
            </div>
        )
        //文章列表界面
        else if (this.state.view == "choose") return (<div>
                <h2>我的文章列表:</h2>
                <p onClick={this.handleclicked.bind(this, "601a8c86f950a8000a421db2")}>文章一</p><br/>
                <p onClick={this.handleclicked.bind(this, "601a8c86f950a8000a421db2")}>文章二</p><br/>
                <p onClick={this.handleclicked.bind(this, "601a8c86f950a8000a421db2")}>文章三</p><br/>
            </div>


        )
    }
}

export default Edit;
