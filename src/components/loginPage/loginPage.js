import React from 'react';
import cookie from 'react-cookies'
import axios from "axios";
import Modal from 'react-modal'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            password: '',
            visibled: false
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }
    handleSubmit = () => {
        this.props.onClose();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = JSON.stringify(this.state);
        const apiUrl = "https://qc8vvg.fn.thelarkcloud.com/postSession";
        let sessionToken = "";
        axios.post(apiUrl, data).then(response => {
            console.log(data);
            console.log(response);
            if (response.status == 200) {
                cookie.save("sessionToken", response.data.sessionToken);
            } else {
                alert("登陆失败")
            }
        })
    }
    componentDidUpdate(){

        }

    render() {
        return(
            <Modal isOpen={this.props.modalIsopen} ariaHideApp={!this.props.modalIsopen} className={'modal'}>
                <form>
                    <h2>迷你版今日头条</h2>
                    <p>登录</p>
                    <div className={'label-phone'}>
                        <a>手机号码</a>
                        <input type="tel" name="phoneNumber"/>
                    </div>
                    <br/>
                    <div className={'label-code'}>
                        <a>密码</a>
                        <input type="password" name="password"/>
                    </div>
                    <br/>
                    <input type="submit" value="提交" onSubmit={this.handleSubmit} className={'submit'}/>
                </form>
            </Modal>
        )
    }
}

export default LoginPage
