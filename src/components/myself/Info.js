import React from 'react';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Peter',
            sex: '男',
            phone: '12239049023'
        }
    }

    render() {
        return (
            <div>
                <ul>姓名：{this.state.name}</ul>
                <ul>性别：{this.state.sex}</ul>
                <ul>电话：{this.state.phone}</ul>
            </div>
        )
    }
}

export default Info;