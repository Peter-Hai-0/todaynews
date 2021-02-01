import React from 'react';

class ArticleEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'edit'}>
                <ul>标题：
                    <input/>
                </ul>
                <ul>来源：
                    <input/>
                </ul>
                <ul>内容：
                    <textarea></textarea>
                </ul>
                <ul>
                    <button>提交</button>
                </ul>
            </div>
        )
    }
}

export default ArticleEdit;