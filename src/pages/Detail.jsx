import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";



function Detail( props ) {

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

    // useEffect(()=>{  }) 1. 재렌더링마다 코드 실행 
    // useEffect(()=>{  }, []) 2. mount시 1회 코드 실행 / 5. 특정 state 변경시에만 실행하려면 [state명]
    // useEffect(()=>{  
    //  return ()=>{
    //       3. unmount시 1회 코드 실행 
    //       4. useEffect 실행 전에 뭔가 실행하려면 언제나 return ()=>{}
    //  }
    // }, [])
    
    let [showAlert, setShowAlert] = useState(true);

    let {id} = useParams();
    let shoe = props.shoes.find((x)=> x.id == id)

    return(
        <div className="container">
            {
                showAlert == true
                ?   <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div>
                : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                    <input type="text" onChange={(e)=>{setText(e.target.value)}}/>
                    <h4 className="pt-5">{shoe.title}</h4>
                    <p>{shoe.content}</p>
                    <p>{shoe.price}</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    )
}

export default Detail;