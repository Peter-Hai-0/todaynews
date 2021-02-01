import {createStore} from 'redux'
import reducer from './reducer'

// 创建store库
const store = createStore(reducer)

export default store;