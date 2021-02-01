import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    loginEvent = () => {

    }

    render() {
        return (
            <div className={'login-box'}>
                <p>登录后可以保存您的浏览喜好、评论、收藏
                    并与APP同步，更可以发布微头条</p>

                <button onClick={this.loginEvent}> 登录</button>

            </div>

        )
    }
}

export default Login;