import React from 'react';
import '../assets/css/index.css';
import Fetchjsonp from 'fetch-jsonp';
import Axios from 'axios'

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
                <div className="weather">
                    <a className="city">{this.state.list.city}</a>
                    <a className="city_weather">{this.state.list.weather}</a>
                    <a className="city_temperature">{this.state.list.temperature} ℃</a>
                    <button className="zhuce" style={{float: 'right'}} onClick={this.zhuce}> 注册头条号</button>
                </div>
            </div>
        )
    }
}

export default Head;