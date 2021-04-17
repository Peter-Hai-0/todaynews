/*
  @connect: 连接器-将state，dispatch连接在一起 connect(state, dispatch)(TodeList)
  @TodeList: 将TodeList封装成一个UI组件，并传入参数props，可以接受外部传的所有参数

*/
import React from 'react';
import {connect} from 'react-redux'
import {changeInputAction, addItemAction, delItemAction} from '../store/actionCreated'

const TodeList = (props) => {
    let {inputVal, inputChange, clickButton, list, delItem} = props
    return (
        <div>
            <div>
                <input value={inputVal} onChange={inputChange}/>
                <button onClick={clickButton}>提交</button>
            </div>
            <ul>
                {
                    list.map((item, index) => {
                        return <li key={item + index} onClick={delItem.bind(this, index)}>{item}</li>
                    })
                }
            </ul>
        </div>
    );
}

const stateToProps = (state) => {
    return {
        inputVal: state.inputVal,
        list: state.list
    }
}

const dispatchToProps = (dispatch) => {
    return {
        inputChange(e) {
            let action = changeInputAction(e.target.value)
            dispatch(action)
        },
        clickButton() {
            let action = addItemAction()
            dispatch(action)
        },
        delItem(value) {
            let action = delItemAction(value)
            dispatch(action)
        }
    }
}

export default connect(stateToProps, dispatchToProps)(TodeList);