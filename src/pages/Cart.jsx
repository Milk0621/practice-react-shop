import { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount } from "./../store/cartSlice";
import { changeName, changeAge } from "./../store/userSlice";

function Cart(){

    let state = useSelector((state)=> state)
    let dispatch = useDispatch();

    return (
        <div>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={()=>{
                dispatch(changeAge(10))
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    { state.cart.map((product, i)=>(
                        <tr key="i">
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.count}</td>
                            <td><button onClick={()=>{
                                dispatch(addCount(product.id))
                            }}>+</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;