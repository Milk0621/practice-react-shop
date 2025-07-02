import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

function Main({ shoes, setShoes }) {
  
  return (
    <>
      <div className="main-bg"></div>
      <div className='container'>
        <div className='row'>
          {shoes.map((shoe, i) => (
            <Product
              key={shoe.id}
              shoe={shoe}
              src={`https://codingapple1.github.io/shop/shoes${shoe.id + 1}.jpg`}
            />
          ))}
        </div>
      </div>
      <button onClick={()=>{
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result)=>{
          let copy = [...shoes, ...result.data];
          setShoes(copy);
        })
        .catch(()=>{
          console.log('실패');
        })
      }}>버튼</button>
    </>
  );
}

function Product(props) {
  return (
    <div className="col-md-4">
      <img src={props.src} width="80%" />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </div>
  );
}

export default Main;