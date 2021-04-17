import {CHANGE_INPUT, ADD_ITEM, DEL_ITEM} from './actionType'

const defaultState = {
    inputVal: 'hahah',
    list: []
}

/*
  @state=defaultState:默认store定义值
  @action:通过dispatch需要改变得值
  @CHANGE_INPUT: input框change事件，改变得value与inputVal绑定
  @ADD_ITEM: 点击提交按钮，将inputVal放入li中
  @DEL_ITEM: 点击哪个li删除哪个
*/
export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case CHANGE_INPUT:
            newState.inputVal = action.value
            break;
        case ADD_ITEM:
            newState.list.push(newState.inputVal)
            break;
        case DEL_ITEM:
            newState.list.splice(action.value, 1)
            break;
        default:
            return state
            break;
    }
    return newState
}