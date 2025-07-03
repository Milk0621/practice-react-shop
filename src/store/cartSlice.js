import { configureStore, createSlice } from '@reduxjs/toolkit'

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action){
            let item = state.find((x)=> x.id == action.payload)
            item.count += 1;
        },
        addCart(state, action){
            let result = state.find((x)=> x.id == action.payload.id)
            if (result) {
                result.count += 1;
            } else {
                state.push(action.payload);
            }
        },
        deleteCart(state, action){
            let index = state.findIndex((x)=> x.id == action.payload)
            state.splice(index, 1)
        }
    }
})
export let {addCount, addCart, deleteCart} = cart.actions

export default cart