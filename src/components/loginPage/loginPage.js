import React from 'react';
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

    componentDidUpdate() {

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
