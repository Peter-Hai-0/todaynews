import React from 'react';
import {withRouter} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'signin',
            info: {
                head_img: "",
                name: "NOMAD",
                sex: '男'
            }
        }
    }

    loginEvent = () => {
        // document.getElementById("signin_form").submit()
        this.props.set_user_info(this.state.info);
        this.setState({
            view: 'signok'
        })
    }
    AddEvent = () => {
        alert("发布文章");
    }

    render() {
        if (this.state.view == 'signok') return (<div className={'login-box'}>
            <div className={"right-text"} onClick={() => {
                this.setState({view: 'signin'})
            }}>退出登录
            </div>
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3649178992,1821853682&fm=26&gp=0.jpg"/>
            <br/><p><strong>昵称：</strong>{this.state.info.name}</p>
            <p>性别：{this.state.info.sex}</p>
            <button onClick={this.AddEvent}>发布文章</button>


        </div>)
        else if (this.state.view == 'signin') return (<div className={'login-box'}>
            <p className={"capture"}>登录后可以保存您的浏览喜好、评论、收藏</p>
            <p className={"capture"}> 并与APP同步，更可以发布微头条</p>
            <div className={"log_form"}>
                <form action={"https://qc8vvg.fn.thelarkcloud.com/add"} id={"signin_form"} target={"respon"}
                      method={"POST"}>
                    <input placeholder={"账号/手机号"} type="text" name={"account"}/>
                    <input placeholder={"密码"} type="password" name={"password"}/>
                    <button onClick={this.loginEvent} type={'submit'}> 登录</button>
                </form>
                {/*<button onClick={this.loginEvent}> 登录</button>*/}
            </div>
            <div className={"signup"} onClick={() => {
                this.setState({view: 'signup'})
            }}>注册账号
            </div>
            {/*<iframe name={"respon"}></iframe>*/}
            <p name="respon"></p>
        </div>)
        else return <div className={'login-box'}>
                <p className={"capture"}>登录后可以保存您的浏览喜好、评论、收藏</p>
                <p className={"capture"}> 并与APP同步，更可以发布微头条</p>
                <div className={"log_form"}>
                    <form action={""}>
                        <input placeholder={"账号/手机号"} type="text" name={"account"}/>
                        <input placeholder={"密码"} type="password" name={"password"}/>
                        <input placeholder={"再次输入密码"} type="password" name={"_password"}/>
                        <button onClick={this.loginEvent} type={'submit'}> 注册</button>
                    </form>
                </div>
            </div>
    }
}

export default withRouter(Login);
