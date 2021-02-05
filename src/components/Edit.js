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

    clicked = () => {
        this.setState({view: "edit", article: {title: "q", writer: "w", detail: "e"}})
        // this.inner_data()
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
                    <button onClick={this.add_news}>提交</button>
                </div>
            </div>
        )
        //文章列表界面
        else if (this.state.view == "choose") return (<div>
                <h2>我的文章列表</h2>
                <button onClick={this.clicked}>编辑</button>
            </div>


        )
    }
}

export default Edit;
