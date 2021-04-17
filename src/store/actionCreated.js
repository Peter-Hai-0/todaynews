import {CHANGE_INPUT, ADD_ITEM, DEL_ITEM} from './actionType'

export const changeInputAction = (value) => ({
    type: CHANGE_INPUT,
    value
})

export const addItemAction = (value) => ({
    type: ADD_ITEM,
    value
})

export const delItemAction = (value) => ({
    type: DEL_ITEM,
    value
})