import React from 'react';
import {Route, Link} from 'react-router-dom';
import axios from "axios";

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            domain: 'https://qc8vvg.fn.thelarkcloud.com/query?_id=',
            title: '',
            writer: '',
            time: '',
            comments: [],
        }
    }

    //处理图片链接
    getImg_url = (res) => {
        var str = res.data.result.detail;
        console.log(str);
        //var url_reg = new RegExp("(?<=https:).*(?=from=pc)");
        var pic = [];
        var tail = 0;
        var changeddetail = [];
        var len = 0;
        var i = 0;
        var str_cp;
        str_cp = res.data.result.detail;
        var h = 0;
        while (str.length > 0) {
            var item = str.match(/https:(\S*)from=pc/);
            if (item == null) break;
            pic.push(item[0]);
            tail = item.index + tail + 1;
            console.log(item.index)
            str = str.substring(item.index + 1);
            len = item[0].length + 1;
            if (tail == 0) {
                var object = {};
                object = {img: item[0]};
                changeddetail.push(object);
                h = len;
            } else {

                var content = {};
                console.log(h, tail - 1)
                content = {content: str_cp.slice(h, tail - 1)};
                //console.log(len,temp,h,content)
                changeddetail.push(content);

                var object = {};
                object = {img: item[0]};
                changeddetail.push(object);
                h = tail + len;
            }

            console.log(tail, str)
        }
        if (h < str_cp.length) {
            var content = {};
            content = {content: str_cp.slice(h, str_cp.length)};
            changeddetail.push(content);
        }

        this.setState({
            detail: changeddetail
        })
        console.log(this.state.detail)
        console.log(pic)
    }

    componentDidMount() {
        //console.log(this.props)
        this.getDetail(this.props.match.params.id);


    }

    getDetail = (id) => {
        var api = this.state.domain + id;
        axios.get(api)
            .then((res) => {
                //console.log(res);
                this.setState({
                    title: res.data.result.title,
                    writer: res.data.result.writer,
                    time: res.data.result.createdAt,
                    comments: res.data.result.comment_id,
                    //detail:res.data.result.detail
                })
                console.log(this.state.detail)
                //处理图片
                this.getImg_url(res);


            })
            .catch((err) => {
                console.log(err)
            })
    }
    createMarkup = (str) => {
        var html = {_html: str};
        return <div dangerouslySetInnerHTML={html}></div>
    }
    render() {

        return (
            <div>
                <h2>{this.state.title}</h2>
                <div>
                    <a>{this.state.writer}</a>
                    <a>{this.state.time}</a>
                </div>
                <div>
                    {
                        this.state.detail.map((value, key) => {
                            return (
                                <div className={'content'} key={key}>
                                    <div dangerouslySetInnerHTML={{__html: value.content}}
                                         className={'content-p'}></div>
                                    <img src={value.img}/>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        )
    }
}

export default Content;