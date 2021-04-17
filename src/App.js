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
import {message} from 'antd'

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
                    <header className="title"><Link to={"/"} style={{cursor: "pointer"}} className={'title-text'}>
                    </Link>
                    </header>
                    <br/>
                    <div className={'wrapper'}>
                        <div className={'left'}>
                            <div className="tab">
                                <Link to="/"><a>推荐</a></Link>
                                <Link to="/"><a>热点</a></Link>
                                <Link to="/"><a>科技</a></Link>
                                <Link to="/"><a>直播</a></Link>
                                <Link to="/"><a>游戏</a></Link>
                                <Link to="/"><a>娱乐</a></Link>
                                <Link to="/"><a>数码</a></Link>
                                <Link to="/"><a>财经</a></Link>
                            </div>
                            <div className={"router_item"}>
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
                                <Route path="/Edit/:name" component={Edit}/>
                            </div>
                        </div>

                        <div className={'right'}>
                            <div>
                                <Login set_user_info={this.set_user_info}/>

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
