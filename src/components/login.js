import React from 'react';
import {withRouter} from 'react-router-dom';
import Loginpage from './loginPage/loginPage.js'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columndata: {},
            modalIsopen: false,
        }
    }

    loginEvent = (record) => {
        // this.props.history.push('/loginPage')
        this.setState({
            modalIsopen: true,
            columndata: record
        })
        console.log(this.state.modalIsopen)
    }

    componentDidUpdate() {

    }

    onClose = () => {
        this.setState({
            modalIsopen: false
        })
        alert(this.state.modalIsopen, '111')
    }

    render() {
        return (
            <div className={'login-box'}>
                <p>登录后可以保存您的浏览喜好、评论、收藏</p>
                <p> 并与APP同步，更可以发布微头条</p>

                <button onClick={this.loginEvent.bind(this, 'columndata')}> 登录</button>
                <Loginpage modalIsopen={this.state.modalIsopen} entray={this.state.columndata} onClose={this.onClose}/>
            </div>

        )
    }
}

export default withRouter(Login);
