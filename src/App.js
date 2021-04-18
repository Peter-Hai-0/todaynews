import './assets/css/index.css';
import React from 'react';
// import "antd/dist/antd.css"
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import NewsList from './components/NewsList'
import Head from './components/head'
import Tail from './components/tail'
import Login from './components/login'
import Content from './components/content'
import Add from './components/Add'
import Edit from './components/Edit'
import Tab from './components/Tab'

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
                            <Tab/>
                            <div className={"router_item"}>
                                <Route exact path="/:type" component={NewsList}/>
                                <Route exact path="/" component={NewsList}/>
                                <Route path={'/content/:id'} component={Content}/>
                                <Route path="/Add/:name" component={Add}/>
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
                </div>


            </Router>

  );
    }
}

export default App;
