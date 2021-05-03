import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import {Link} from 'react-router-dom';
import Loading from './small_component/Loading'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'signin',
            info: {
                head_img: "",
                name: "",
                sex: ""
            }
        }
    }

    loginEvent = () => {
        this.setState({
            view: "loading"
        });
        axios.post("https://qc8vvg.fn.thelarkcloud.com/test_add", {
            name: this.username.value,
            password: this.password.value
        })
            .then((res) => {
                // console.log(res);
                if (res.data.result === null) {
                    this.setState({
                        view: 'signin'
                    })
                    alert("账号或密码错误");
                } else this.setState({
                    info: {
                        head_img: res.data.result.head_img,
                        name: res.data.result.name,
                        sex: res.data.result.sex
                    },
                    view: 'signok',
                });
                // this.props.set_user_info(this.state.info);
                document.getElementById("username_value").innerHTML = this.state.info.name;
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loading: 'signin'
                })
            })
    };
    AddEvent = () => {
        ;
    }
    SignUpEvent = () => {
        if (this.s_password.value != this.again_password.value) {
            alert("两次密码不同")
            return
        }
        axios.post("https://qc8vvg.fn.thelarkcloud.com/signup",
            {
                s_name: this.s_name.value,
                s_password: this.s_password.value
            })
            .then((res) => {
                if (res.data.result.name == this.s_name.value) {
                    alert("注册成功");
                    this.setState({
                        view: "signok", info: {
                            head_img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3511863988,1526043200&fm=11&gp=0.jpg"
                            , name: res.data.result.name, sex: "未知"
                        }
                    })
                } else alert("注册失败");
            })
    }
    exitEvent = () => {
        this.setState({
            view: 'signin'
        })
        // this.props.set_user_info({})
        document.getElementById("username_value").innerHTML = ""
    }

    render() {
        //已登录
        if (this.state.view === 'signok') return (<div className={'login-box'}>
            <div className={"right-text"} onClick={this.exitEvent} style={{cursor: "pointer"}}>退出登录
            </div>
            <img src={this.state.info.head_img}/>
            <br/><p>昵称：<strong id={"username"}>{this.state.info.name}</strong></p>
            <p>性别：{this.state.info.sex}</p>
            <Link to={"/Add/" + this.state.info.name}>
                <button onClick={this.AddEvent} id={"fabu"} className={"log_form"}>发布文章</button>
            </Link>
            <br/>
            <Link to={"/Edit/" + this.state.info.name}>
                <button onClick={this.AddEvent} id={"fabu"} className={"log_form"}>文章列表</button>
            </Link>
        </div>)
        //登录
        else if (this.state.view === 'signin') return (

            <div className={'login-box'}>
                <p className={"capture"}>登录后可以保存您的浏览喜好、评论、收藏</p>
                <p className={"capture"}> 并与APP同步，更可以发布微头条</p>
                <div className={"log_form"}>
                    <form action={"https://qc8vvg.fn.thelarkcloud.com/add"} target={"respon"}
                          method={"POST"}>
                        <input placeholder={"账号/手机号"} type="text" ref={(input) => this.username = input}/>
                        <input placeholder={"密码"} type="password" ref={(input) => this.password = input}/>
                    </form>
                    <button onClick={this.loginEvent}> 登录</button>
                    <p id={"wrong"}></p>
                </div>
                <a className={"signup"} onClick={() => {
                    this.setState({view: 'signup'})
                }} style={{cursor: "pointer"}}>注册账号
                </a>
            </div>
        )
        else if (this.state.view === 'loading') return <div className={"login-box"}><Loading/></div>;//加载动画
        //注册
        else return <div className={'login-box'}>
                <p className={"capture"}>登录后可以保存您的浏览喜好、评论、收藏</p>
                <p className={"capture"}> 并与APP同步，更可以发布微头条</p>
                <div className={"log_form"}>
                    <form action={"https://qc8vvg.fn.thelarkcloud.com/signup"} target={"respon"}
                          method={"POST"}>
                        <input placeholder={"账号/手机号"} type="text" ref={(input) => this.s_name = input}/>
                        <input placeholder={"密码"} type="password" ref={(input) => this.s_password = input}/>
                        <input placeholder={"再次输入密码"} type="password" ref={(input) => this.again_password = input}/>

                    </form>
                    <button onClick={this.SignUpEvent}> 注册</button>
                    <div className={"signup"} onClick={() => {
                        this.setState({view: 'signin'})
                    }} style={{cursor: "pointer"}}>已有账号，直接登录
                    </div>
                    {/*<iframe id={"respon"}></iframe>*/}
                </div>
            </div>
    }
}

export default withRouter(Login);