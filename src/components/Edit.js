import React from 'react';
import {Router, Route, Link} from 'react-router-dom';
import axios from 'axios'
import login from "./login";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "choose",
            article: {_id: "", title: "", writer: "", detail: ""}
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
        axios.patch("https://qc8vvg.fn.thelarkcloud.com/userNews", {
            _id: document.getElementById("aid").value,
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
                _id: this.refs.aid.value,
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
                <h3 id={"succ_add"}></h3>

                <input type={""} id={"aid"} ref={"title"} value={this.state.article._id} ref={"aid"}
                       onChange={this.handleChange.bind(this)}/>
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
        else if (this.state.view == "choose") return (<div>
                <h2>我的文章列表:</h2>
                <p onClick={this.handleclicked.bind(this, "601d33216cae080009ce3f00")}>文章一</p><br/>
                <p onClick={this.handleclicked.bind(this, "601a8c86f950a8000a421db2")}>文章二</p><br/>
                <p onClick={this.handleclicked.bind(this, "601a8c86f950a8000a421db2")}>文章三</p><br/>
            </div>


        )
    }
}

export default Edit;
