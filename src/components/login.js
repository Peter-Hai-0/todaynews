import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import {Link} from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'signin',
            info: {
                head_img: "",
                name: "NOMAD",
                sex: ""
            }
        }
    }

    loginEvent = () => {
        axios.post("https://qc8vvg.fn.thelarkcloud.com/test_add", {
            name: this.refs.username.value,
            password: this.refs.password.value
        })
            .then((res) => {
                // if(res.data)
                console.log(res)
                this.setState({
                    info: {
                        head_img: res.data.result.head_img,
                        name: res.data.result.name,
                        sex: res.data.result.sex
                    },
                    view: 'signok',
                })
                this.props.set_user_info(this.state.info);
            })
            .catch((err) => {
                document.getElementById("wrong").innerHTML = "密码错误";
                // setTimeout(document.getElementById("wrong").innerHTML = "",2000);
                console.log(err)
            })

    }
    AddEvent = () => {
        ;
    }
    SignUpEvent = () => {
        if (this.refs.s_password.value != this.refs.again_password.value) {
            alert("两次密码不同")
            return
        }
        axios.post("https://qc8vvg.fn.thelarkcloud.com/signup",
            {
                s_name: this.refs.s_name.value,
                s_password: this.refs.s_password.value
            })
            .then((res) => {
                if (res.data.result.name == this.refs.s_name.value) {
                    alert("注册成功")
                }
                else alert("注册失败")
            })
    }
    exitEvent = () => {
        this.setState({
            view: 'signin'
        })
        this.props.set_user_info({})
    }

    render() {
        //已登录
        if (this.state.view == 'signok') return (<div className={'login-box'}>
            <div className={"right-text"} onClick={this.exitEvent}>退出登录
            </div>
            <img src={this.state.info.head_img}/>
            <br/><p><strong>昵称：</strong>{this.state.info.name}</p>
            <p>性别：{this.state.info.sex}</p>
            <Link to={"/Add"}>
                <button onClick={this.AddEvent} id={"fabu"}>发布文章</button>
            </Link>
            <Link to={"/Edit"}>
                <button onClick={this.AddEvent} id={"fabu"}>编辑文章</button>
            </Link>
        </div>)
        //登录
        else if (this.state.view == 'signin') return (<div className={'login-box'}>
            <p className={"capture"}>登录后可以保存您的浏览喜好、评论、收藏</p>
            <p className={"capture"}> 并与APP同步，更可以发布微头条</p>
            <div className={"log_form"}>
                <form action={"https://qc8vvg.fn.thelarkcloud.com/add"} target={"respon"}
                      method={"POST"}>
                    <input placeholder={"账号/手机号"} type="text" ref={"username"}/>
                    <input placeholder={"密码"} type="password" ref={"password"}/>
                </form>
                <button onClick={this.loginEvent}> 登录</button>
                <p id={"wrong"}></p>
            </div>
            <div className={"signup"} onClick={() => {
                this.setState({view: 'signup'})
            }}>注册账号
            </div>
        </div>)
        //注册
        else return <div className={'login-box'}>
                <p className={"capture"}>登录后可以保存您的浏览喜好、评论、收藏</p>
                <p className={"capture"}> 并与APP同步，更可以发布微头条</p>
                <div className={"log_form"}>
                    <form action={"https://qc8vvg.fn.thelarkcloud.com/signup"} target={"respon"}
                          method={"POST"}>
                        <input placeholder={"账号/手机号"} type="text" ref={"s_name"}/>
                        <input placeholder={"密码"} type="password" ref={"s_password"}/>
                        <input placeholder={"再次输入密码"} type="password" ref={"again_password"}/>

                    </form>
                    <button onClick={this.SignUpEvent}> 注册</button>
                    <div className={"signup"} onClick={() => {
                        this.setState({view: 'signin'})
                    }}>已有账号，直接登录
                    </div>
                    <iframe id={"respon"}></iframe>
                </div>
            </div>
    }
}

export default withRouter(Login);
