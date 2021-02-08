import React, {Component} from 'react'
import axios from 'axios'

export default class LikeBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
            like_num: 0
        }
    }

    UNSAFE_componentWillReceiveProps() {
        let _id = this.props.article_state._id
        let name = document.getElementById("username") == null ? '' : document.getElementById("username").innerHTML
        axios.get("https://qc8vvg.fn.thelarkcloud.com/userLiked", {params: {_id: _id, name: name}})
            .then((res) => {
                if (res.status == 200) {
                    this.setState({isLiked: true})
                }
            })
        let num = this.props.article_state.like;
        this.setState({
            like_num: num,

        })
    }

    render() {
        return (<div>
            <span onClick={this.handleLike.bind(this)}>
                    {
                        this.state.isLiked ? '赞👍' : '赞👍🏾'
                    }
                </span>
                {this.state.like_num}
            </div>
        )
    }

    handleLike() {
        if (document.getElementById("username") == null) {
            alert("您还未登录")
            return
        }
        if (this.state.isLiked) {
            this.setState({
                like_num: this.state.like_num - 1,
                isLiked: false
            })
            let _id = this.props.article_state._id
            let name = document.getElementById("username") == null ? '' : document.getElementById("username").innerHTML
            axios.post("https://qc8vvg.fn.thelarkcloud.com/userLiked", {name: name, _id: _id, type: 'd'})
                .then((res) => {
                    if (res.status == 200) console.log("取消点赞")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            this.setState({
                like_num: this.state.like_num + 1,
                isLiked: true
            })
            let _id = this.props.article_state._id
            let name = document.getElementById("username") == null ? '' : document.getElementById("username").innerHTML
            axios.post("https://qc8vvg.fn.thelarkcloud.com/userLiked", {name: name, _id: _id, type: 'l'})
                .then((res) => {
                    if (res.status == 200) console.log("赞")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}