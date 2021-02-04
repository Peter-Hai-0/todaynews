import React from 'react';
import axios from "axios";
import like_0 from '../assets/images/like_0.png';
import like_1 from '../assets/images/like_1.png';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentlist: [],
            textarea_heigh: 'auto',
            likesrc: like_0,
            likeChanged: false
        }
    }

    callAPI = () => {
        axios.get('https://qc8vvg.fn.thelarkcloud.com/getcomment?_id=6017fbb1c280fd0041e06074')
            .then((res) => {
                console.log(res);
                this.setState({
                    commentlist: res.data.comments
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    commentEvent = () => {

    }

    componentDidMount() {
        this.callAPI();

    }

    componentDidUpdate() {

    }

    resize = () => {

        this.setState({
            textarea_heigh: '150px'
        })
    }
    changeLike = () => {
        if (!this.state.likeChanged) {
            this.setState({
                likesrc: like_1,
                likeChanged: true
            })
        } else {
            this.setState({
                likesrc: like_0,
                likeChanged: false
            })
        }
    }

    render() {
        return (
            <div className={'comment'}>
                <div className={'comment-total'}>
                    <a className={'total1'}>200</a>
                    <a className={'total2'}>条评论</a>
                </div>
                <div className={'comment-input'} style={{height: this.state.textarea_heigh}}>
                    <textarea onMouseDown={this.resize} style={{height: this.state.textarea_heigh}}
                              placeholder="写下您的评论..."/>
                    <button type={'button'} onClick={this.commentEvent} style={{height: this.state.textarea_heigh}}>评论
                    </button>
                </div>
                <div>
                    {
                        this.state.commentlist.map((value, key) => {
                            return (
                                <div key={key} className={'comment-writer'}>
                                    <li>
                                        <div className={'user-info'}>
                                            <a style={{color: ''}}>{value.user}</a>
                                        </div>
                                        <div className={'comment-detail'}>
                                            <p>{value.content}</p>
                                        </div>
                                        <div className={'comment-reply'}>
                                            <a className={'comment-reply'}>回复数 {value.reply_num}</a>
                                            <div className={'comment-like'}>
                                                <a>{value.like}</a>
                                                <img src={this.state.likesrc} onClick={this.changeLike}/>
                                            </div>


                                        </div>

                                    </li>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Comments;