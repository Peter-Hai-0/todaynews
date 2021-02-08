import React from 'react';
import Axios from "axios";
import like_0 from '../assets/images/like_0.png';
import like_1 from '../assets/images/like_1.png';
import me from '../assets/images/me.png'
import axios from "axios"

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentlist: [],
            textarea_heigh: 'auto',
            likesrc: like_1,
            index: [],
            user_img: me,
            user_info: ''
        }
    }

    callAPI = () => {
        // 6018f0e4b588ae021ac5ac91
        Axios.get('https://qc8vvg.fn.thelarkcloud.com/getcomment', {params: {_id: this.props.aid}})
            .then((res) => {
                console.log(res)

                var temp = res.data.comments;
                var i = 0;
                for (; i < temp.length; i++) {
                    temp[i].islike = false
                    temp[i].time = this.decodeTimeStamp(temp[i].time)
                }
                this.setState({
                    commentlist: temp
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //获取登录信息
    getuserInfo = (name) => {
        if (name != null)
            Axios.get('https://qc8vvg.fn.thelarkcloud.com/get_user_info?name=' + name.innerHTML)
                .then((res) => {
                    // console.log('111',res.data)
                    this.setState({
                        user_info: res.data.user_info,
                        user_img: res.data.user_info.head_img
                    })
                    this.forceUpdate();
                }).catch((err) => {
                console.log('getuserinfo error')
            })
    }
    //提交评论
    commentEvent = () => {
        if (document.getElementById("username") == null) {
            alert("请登录后再评论")
            return
        }
        Axios.post("https://qc8vvg.fn.thelarkcloud.com/comment", {
            name: this.state.user_info.name,
            head_img: this.state.user_info.head_img,
            content: this.commentContent.value,
            _id: this.props.aid

        })
            .then((res) => {
                this.state.commentlist.push({
                    user: this.state.user_info.name,
                    head_img: this.state.user_info.head_img,
                    content: this.commentContent.value,
                    islike: false,
                    reply_num: 0,
                    like: [],
                    at: '',
                    time: '刚刚'
                })
                this.forceUpdate()
                document.getElementById("comment-textarea").value = ""

            })
            .catch((err) => {
                console.log(err)
            })
    }

    UNSAFE_componentWillReceiveProps() {
        this.callAPI();
        this.getuserInfo(document.getElementById('username'));
        //渲染登录头像
        this.islogin(document.getElementById('username'), 'img')
    }


    //评论窗口变化
    resize = (name) => {
        this.setState({
            textarea_heigh: '150px'
        })
    }
    //点赞
    showLike = (name, k) => {
        const tempcommentlist = this.state.commentlist;
        console.log(name)
        if (name != '') {
            if (!this.state.commentlist[k].islike) {

                tempcommentlist[k].like.push(name);
                this.setState({
                    commentlist: tempcommentlist.map((item, key) => key == k ? {...item, islike: true} : item)
                })
            }
            else {
                var len = tempcommentlist[k].like.length;
                tempcommentlist[k].like.splice(len - 1, 1);
                this.setState({
                    commentlist: tempcommentlist.map((item, key) => key == k ? {...item, islike: false} : item)
                })
            }

            console.log('2', this.state.commentlist)
        } else {
            alert('您还没登录，请登录后再点赞')
        }
        ;
    }

    replyEvent = () => {
        axios.post("https://qc8vvg.fn.thelarkcloud.com/commentContent", {_id: this.props.aid, s: ''})
            .then((res) => {
                console.log(res)
            })
    }
//判断是否登录
    islogin = (name, type) => {
        if (name == null) {
            this.setState({
                user_img: me
            })
            // alert('您还没登录，请登录后再评论')
            this.forceUpdate();
        }
        else {
            this.forceUpdate();
            if (type == 'submit') {
                this.commentEvent();
            }
            console.log(name.innerHTML)
        }

    }

    //头像渲染



    render() {
        return (
            <div className={'comment'}>
                <meta name="referrer" content="no-referrer"/>
                <div className={'comment-total'}>
                    <a className={'total1'}>{this.state.commentlist.length}</a>
                    <a className={'total2'}>条评论</a>
                </div>
                <div className={'comment-input'} style={{height: this.state.textarea_heigh}}>
                    <img src={this.state.user_img} style={{cursor: "pointer"}}
                         onClick={this.islogin.bind(this, document.getElementById('username_value'), 'img')}/>
                    <textarea onMouseDown={this.resize.bind(this, document.getElementById('username_value'), 'text')}
                              style={{height: this.state.textarea_heigh}}
                              ref={(textarea) => this.commentContent = textarea}
                              placeholder="写下您的评论..." id={"comment-textarea"}/>
                    <button type={'button'} style={{height: this.state.textarea_heigh}}
                            onClick={this.islogin.bind(this, document.getElementById('username_value'), 'submit')}>评论
                    </button>
                </div>
                <div>
                    {
                        this.state.commentlist.slice().reverse().map((value, key) => {
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
                                                <a className={'comment-reply'}
                                                   style={{cursor: "pointer"}}>{value.time}</a>
                                                <div>&nbsp;</div>
                                                ·
                                                <div>&nbsp;</div>
                                                <a className={'comment-reply'} onClick={this.replyEvent}
                                                   style={{cursor: "pointer"}}>回复 {value.reply_num}</a>
                                                <div className={'comment-like'}>
                                                    <a>{value.like.length}</a>
                                                    <img src={value.islike ? like_1 : like_0}
                                                         style={{cursor: "pointer"}}
                                                         onClick={this.showLike.bind(this, document.getElementById('username_value').innerHTML, key)}/>
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

    decodeTimeStamp = (timestamp) => {
        var arrTimestamp = (timestamp + '').split('');
        for (var start = 0; start < 13; start++) {
            if (!arrTimestamp[start]) {
                arrTimestamp[start] = '0';
            }
        }
        timestamp = arrTimestamp.join('') * 1;

        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - timestamp;

        // 如果本地时间反而小于变量时间
        if (diffValue < 0) {
            return '不久前';
        }

        // 计算差异时间的量级
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;

        // 数值补0方法
        var zero = function (value) {
            if (value < 10) {
                return '0' + value;
            }
            return value;
        };

        // 使用
        if (monthC > 12) {
            // 超过1年，直接显示年月日
            return (function () {
                var date = new Date(timestamp);
                return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
            })();
        } else if (monthC >= 1) {
            return parseInt(monthC) + "月前";
        } else if (weekC >= 1) {
            return parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            return parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            return parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            return parseInt(minC) + "分钟前";
        }
        return '刚刚';
    }
}


export default Comments;
