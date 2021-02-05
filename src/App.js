import './assets/css/index.css';
import Axios from 'axios';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Tuijian from './components/tuijian'
import Head from './components/head'
import Tail from './components/tail'
import Keji from './components/keji'
import Redian from './components/redian'
import Yule from './components/yule'
import Youxi from './components/youxi'
import Zhibo from './components/zhibo'
import Shuma from './components/shuma'
import Caijing from './components/caijing'
import Login from './components/login'
import Me from './components/me';
import Content from './components/content'
import Add from './components/Add'
import Edit from './components/Edit'

// import LoginPage from './components/loginPage/loginPage'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            user_info: {}
        }
    }

    set_user_info = (user_obj) => {
        this.setState({
            user_info: user_obj
        })
    }

    searchMsgK = (e) => {
        if (e.keyCode == 13) {
            alert(this.inputValue.value)
        }

    }
    searchMsgB = () => {
        this.searchMsgK();
    }
//<Route path={'/loginPage'} component={LoginPage}></Route>
    render() {
        return (
            <Router>
                <div className={'body'}>
                    < Head/>
                    <header className="title">迷你版今日头条
                        <div className="search-wrapper" style={{float: 'right'}}>
                            <input ref={(input) => this.inputValue = input} onKeyUp={this.searchMsgK}
                                   placeholder="搜索站内资讯、视频或用户"/>
                            <button type="button" onChange={this.searchMsgB}>搜索</button>

                        </div>
                    </header>
                    <br/>
                    <div className="tab" id={"tab"}>
                        <Link to="/">推荐</Link>
                        <Link to="/redian">热点</Link>
                        <Link to="/keji">科技</Link>
                        <Link to="/zhibo">直播</Link>
                        <Link to="/youxi">游戏</Link>
                        <Link to="/yule">娱乐</Link>
                        <Link to="/shuma">数码</Link>
                        <Link to="/caijing">财经</Link>
                    </div>
                    <br/>
                    <div className={'wrapper'}>
                        <div className={'left'}>
                            <Route exact path="/" component={Tuijian}/>
                            <Route path="/keji" component={Keji}/>
                            <Route path="/redian" component={Redian}/>
                            <Route path="/zhibo" component={Zhibo}/>
                            <Route path="/youxi" component={Youxi}/>
                            <Route path="/yule" component={Yule}/>
                            <Route path="/shuma" component={Shuma}/>
                            <Route path="/caijing" component={Caijing}/>
                            <Route path={'/content/:id'} component={Content}></Route>
                            <Route path="/Add" component={Add}/>
                            <Route path="/Edit" component={Edit}/>

                        </div>

                        <div className={'right'}>
                            <div>
                                <Login set_user_info={this.set_user_info}/>
                                <button onClick={() => {
                                    alert(this.state.user_info.name)
                                }}>show父组件state
                                </button>
                                <hr color={'red'}/>
                                <Tail/>
                            </div>

                        </div>

                    </div>
                    {/*<Me/>*/}
                </div>


            </Router>

  );
    }
}

export default App;
