import React from 'react';
import {Link} from "react-router-dom";

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cur_item: "推荐"
        }
    }

    changeItem = (e) => {
        this.setState({
            cur_item: e.target.innerHTML
        })
    }

    render() {
        return (
            <div className={"tab"}>
                <span className={this.state.cur_item === "推荐" ? "tab1" : "tab0"} onClick={(e) => {
                    this.changeItem(e)
                }}><Link to="/0"><a>推荐</a></Link></span>
                <span className={this.state.cur_item === "时政" ? "tab1" : "tab0"} onClick={(e) => {
                    this.changeItem(e)
                }}><Link to="/1"><a>时政</a></Link></span>
                <span className={this.state.cur_item === "数码" ? "tab1" : "tab0"} onClick={(e) => {
                    this.changeItem(e)
                }}><Link to="/2"><a>数码</a></Link></span>
                <span className={this.state.cur_item === "历史" ? "tab1" : "tab0"} onClick={(e) => {
                    this.changeItem(e)
                }}><Link to="/3"><a>历史</a></Link></span>
                <span className={this.state.cur_item === "体育" ? "tab1" : "tab0"} onClick={(e) => {
                    this.changeItem(e)
                }}><Link to="/4"><a>体育</a></Link></span>
                <span className={this.state.cur_item === "军事" ? "tab1" : "tab0"} onClick={(e) => {
                    this.changeItem(e)
                }}><Link to="/5"><a>军事</a></Link></span>
                <span className={this.state.cur_item === "国际" ? "tab1" : "tab0"} onClick={(e) => {
                    this.changeItem(e)
                }}><Link to="/6"><a>国际</a></Link></span>
                <span className={this.state.cur_item === "美食" ? "tab1" : "tab0"} onClick={(e) => {
                    this.changeItem(e)
                }}><Link to="/7"><a>美食</a></Link></span>
            </div>
        )
    }
}

export default Tab;