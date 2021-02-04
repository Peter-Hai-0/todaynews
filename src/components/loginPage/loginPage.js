import React from 'react';
import cookie from 'react-cookies'
import axios from "axios";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            password: '',
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = JSON.stringify(this.state);
        const apiUrl = "https://qc8vvg.fn.thelarkcloud.com/postSession";
        let sessionToken = "";
        axios.post(apiUrl, data).then(response => {
            console.log(data);
            console.log(response);
            if (response.data.success == "success"){
                cookie.save("sessionToken", response.data.sessionToken);
            }
            else {
                alert("登陆失败")
            }
        })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        手机号码:
                        <input type="tel" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} />
                    </label>
                    <label>
                        密码：
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="提交" />
                </form>
            </div>
        )
    }
}

export default LoginPage
