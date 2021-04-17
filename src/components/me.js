import React from 'react';
import Info from './myself/Info'
import Articlemanaged from './myself/articlemanaged'
import ArticleEidt from './myself/articleEdit'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Me extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'red',
            checked_info: true,
            checked_article: false,
            checked_edit: false
        }
    }

    changeColor = (result, e) => {
        if (result == 1) {
            this.setState({
                checked_info: true,
                checked_article: false,
                checked_edit: false
            })
        }
        if (result == 2) {
            this.setState({
                checked_info: false,
                checked_article: true,
                checked_edit: false
            })
        }
        if (result == 3) {
            this.setState({
                checked_info: false,
                checked_article: false,
                checked_edit: true
            })
        }
    }

    render() {
        return (
            <div>
                <header className={'me-head'}>个人管理中心</header>
                <br/>
                <div className={'me'}>
                    <div className={'me-left'}>
                        <div className={'me-item'}>
                            <Link to={'/myself/info'}
                                  style={{color: this.state.checked_info ? `${this.state.color}` : 'black'}}
                                  onClick={this.changeColor.bind(this, '1')}>个人信息</Link>
                        </div>
                        <br/>
                        <div className={'me-item'}>
                            <Link to={'/myself/articlemanaged'}
                                  style={{color: this.state.checked_article ? `${this.state.color}` : 'black'}}
                                  onClick={this.changeColor.bind(this, '2')}>文章列表</Link>
                        </div>
                        <br/>
                        <div className={'me-item'}>
                            <Link to={'/myself/articleEdit'}
                                  style={{color: this.state.checked_edit ? `${this.state.color}` : 'black'}}
                                  onClick={this.changeColor.bind(this, '3')}>文章录入</Link>
                        </div>
                    </div>
                    <div className={'me-right'}>
                        <Route exact path={'/myself/info'} component={Info}/>
                        <Route path={'/myself/articlemanaged'} component={Articlemanaged}/>
                        <Route path={'/myself/articleEdit'} component={ArticleEidt}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Me;