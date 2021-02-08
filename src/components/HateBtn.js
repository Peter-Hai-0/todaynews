import React, {Component} from 'react'
import axios from 'axios'

export default class HateBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHated: false,
            hate_num: 0
        }
    }

    UNSAFE_componentWillReceiveProps() {
        let _id = this.props.article_state._id
        let name = document.getElementById("username") == null ? '' : document.getElementById("username").innerHTML
        axios.get("https://qc8vvg.fn.thelarkcloud.com/userHate", {params: {_id: _id, name: name}})
            .then((res) => {
                if (res.status == 200) {
                    this.setState({isHated: true})
                }
            })
        let num = this.props.article_state.hate;
        this.setState({
            hate_num: num,

        })
    }

    render() {
        return (<div>
            <span onClick={this.handleHate.bind(this)}>
                    {
                        this.state.isHated ? '踩👎' : '踩👎🏿'
                    }
                </span>
                {this.state.hate_num}
            </div>
        )
    }

    handleHate() {
        if (document.getElementById("username") == null) {
            alert("您还未登录")
            return
        }
        if (this.state.isHated) {
            this.setState({
                hate_num: this.state.hate_num - 1,
                isHated: false
            })
            let _id = this.props.article_state._id
            let name = document.getElementById("username") == null ? '' : document.getElementById("username").innerHTML
            axios.post("https://qc8vvg.fn.thelarkcloud.com/userHate", {name: name, _id: _id, type: 'd'})
                .then((res) => {
                    if (res.status == 200) console.log("取消点踩")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            this.setState({
                hate_num: this.state.hate_num + 1,
                isHated: true
            })
            let _id = this.props.article_state._id
            let name = document.getElementById("username") == null ? '' : document.getElementById("username").innerHTML
            axios.post("https://qc8vvg.fn.thelarkcloud.com/userHate", {name: name, _id: _id, type: 'l'})
                .then((res) => {
                    if (res.status == 200) console.log("踩")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}