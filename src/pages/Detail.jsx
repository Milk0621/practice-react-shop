import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from 'react-bootstrap';
import { addCart } from "./../store/cartSlice";

import {Context1} from './../App.jsx';
import { useDispatch, useSelector } from "react-redux";

import {useLike} from './../hooks/like.js' 

function Detail( props ) {

    let [like,addLike] = useLike()

    let state = useSelector((state)=> state)
    let dispatch = useDispatch();

    let [fade, setFade] = useState('');
    let [showAlert, setShowAlert] = useState(true);
    
    let {id} = useParams();
    let shoe = props.shoes.find((x)=> x.id == id)
    
    let [tab, setTab] = useState(0);

    useEffect(()=>{
        let a = setTimeout(()=>{ setFade('end') }, 100);
        return ()=>{
            clearTimeout(a);
            setFade('');
        }
    }, [])

    useEffect(()=>{
        let a = setTimeout(()=>{ setShowAlert(false); }, 2000);
        return ()=>{
            clearTimeout(a);            
        }
    }, [])
    
    let [text, setText] = useState('');
    useEffect(()=>{
        if(isNaN(text)){
            alert("경고! 숫자만 입력하세요.");
        }
    }, [text])

    useEffect(()=>{
        let watched = localStorage.getItem('watched')
        watched = JSON.parse(watched)
        watched.push(shoe.id)
        watched = new Set(watched) //중복 제거용 Set 객체 생성
        watched = Array.from(watched) //Set -> 배열로 다시 변환
        localStorage.setItem('watched', JSON.stringify(watched))
    }, [])

    // useEffect(()=>{  }) 1. 재렌더링마다 코드 실행 
    // useEffect(()=>{  }, []) 2. mount시 1회 코드 실행 / 5. 특정 state 변경시에만 실행하려면 [state명]
    // useEffect(()=>{  
    //  return ()=>{
    //       3. unmount시 1회 코드 실행 
    //       4. useEffect 실행 전에 뭔가 실행하려면 언제나 return ()=>{}
    //  }
    // }, [])

    return(
        <div className={"container start " + fade}>
            {
                showAlert == true
                && <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div>
            }
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                    <input type="text" placeholder="수량" onChange={(e)=>{setText(e.target.value)}}/>
                    <h4 className="pt-5">{shoe.title}</h4>
                    {like} <span onClick={()=>{ addLike() }}>♥</span>
                    <p>{shoe.content}</p>
                    <p>{shoe.price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addCart({id : shoe.id, name : shoe.title, count : 1}))
                    }}>주문하기</button> 
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}/>
        </div> 

        
    )
}
function TabContent({tab}){
    let {inventory} = useContext(Context1);
    let [fade, setFade] = useState('');

    useEffect(()=>{
        let a = setTimeout(()=>{ setFade('end') }, 100)
        return ()=>{
            clearTimeout(a)
            setFade('')
        }
    }, [tab])
    
    return (
        <div className={"start " + fade}>
            {[<div>{inventory}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
        </div>
    )
        
    // if(tab == 0) return <div>내용0</div>
    // else if(tab == 1) return <div>내용1</div>
    // else if(tab == 2) return <div>내용2</div>

}

export default Detail;