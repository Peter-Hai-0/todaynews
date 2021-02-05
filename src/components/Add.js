import React from 'react';
import {Router, Route, Link} from 'react-router-dom';
import axios from 'axios'

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        document.getElementById("tab").style.visibility = "hidden"
    }

    add_news = () => {
        axios.post("https://qc8vvg.fn.thelarkcloud.com/add", {
            title: this.refs.title.value,
            writer: this.refs.writer.value,
            detail: this.refs.detail.value
        })
            .then((res) => {
                if (res.data.params.title == this.refs.title.value) {
                    // document.getElementById("succ_add").innerHTML = "发布成功"
                    alert("发布成功")
                }
                else {
                    alert("发布失败")
                }
            })
    }

    render() {
        return (
            <div className={"add_article"}>
                <h2>发布新闻</h2>
                <h3 id={"succ_add"}></h3>

                <label>标题</label><input name={"title"} type={"text"} ref={"title"}/> <br/>
                <label>来源</label><input name={"writer"} type={"text"} id={"laiyuan"} ref={"writer"}/> <br/>
                <textarea name={"detail"} type={"text"} ref={"detail"} placeholder={"请在此处输入内容"}/>
                <div>
                    <button onClick={this.add_news}>提交</button>
                </div>
            </div>
        )
    }
}

export default Add;
