import React from 'react';
import '../assets/css/index.css';
import Fetchjsonp from 'fetch-jsonp';
import Axios from 'axios'
// import {Button} from 'antd'
import {Link} from 'react-router-dom'

class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                city: '北京',
                weather: '晴',
                temperature: 20
            }
        }
    }

    zhuce = () => {

    }

    render() {
        return (
            <div className="head">
                <a className="city">{this.state.list.city}</a>
                <a className="city_weather">{this.state.list.weather}</a>
                <a className="city_temperature">{this.state.list.temperature} ℃</a>
                <Link to={"/"}><strong>迷你版今日头条</strong></Link>
                <span className="search-wrapper" style={{float: 'right'}}>
                        <input ref={(input) => this.inputValue = input} onKeyUp={this.searchMsgK}
                               placeholder="搜索站内资讯、视频或用户"/>
                        <button type="button" onChange={this.searchMsgB}>搜索</button>
                    {/*<Button>搜索</Button>*/}
                    </span>
                <button className="zhuce" style={{display:"none"}} onClick={this.zhuce}><strong
                    id={"username_value"} ></strong></button>
            </div>
        )
    }
}

export default Head;