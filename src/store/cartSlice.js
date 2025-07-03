import { configureStore, createSlice } from '@reduxjs/toolkit'

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changeNum(state, action){
            let item = state.find((x)=> x.id == action.payload)
            item.count += 1;
        }
    }
})
export let {changeNum} = cart.actions

export default cart