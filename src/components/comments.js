import React from 'react';
import axios from "axios";
import like_0 from '../assets/images/like_0.png';
import like_1 from '../assets/images/like_1.png';
import me from '../assets/images/me.png'

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentlist: [],
            textarea_heigh: 'auto',
            likesrc: like_0,
            likeChanged: false,
            index: [],

        }
    }

//
    //6017fbb1c280fd0041e06074
    //
    //
    callAPI = () => {
        axios.get('https://qc8vvg.fn.thelarkcloud.com/getcomment?_id=6018f0e4b588ae021ac5ac91')
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
    changeLike = (key) => {


    }
    showLike = (key) => {
        if (this.state.index[key] == true) {
            return like_1;
        } else return like_0;
    }

    render() {
        return (
            <div className={'comment'}>
                <meta name="referrer" content="no-referrer"/>
                <div className={'comment-total'}>
                    <a className={'total1'}>200</a>
                    <a className={'total2'}>条评论</a>
                </div>
                <div className={'comment-input'} style={{height: this.state.textarea_heigh}}>
                    <img src={me}/>
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
                                    <div>
                                        <a className={'user-img'}>
                                            <img src={value.head_img}/>
                                        </a>
                                    </div>
                                    <div>
                                        <li>
                                            <div className={'user-info'}>
                                                <a>{value.user}</a>
                                            </div>
                                            <div className={'comment-detail'}>
                                                <p>{value.content}</p>
                                            </div>
                                            <div className={'comment-reply'}>
                                                <a className={'comment-reply'} onM>回复 {value.reply_num}</a>
                                                <div className={'comment-like'}>
                                                    <a>{value.like.length}</a>
                                                    <img src={this.showLike(key)} onClick={this.changeLike}/>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
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