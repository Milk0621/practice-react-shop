import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

function Main({ shoes, setShoes }) {
  let [clickCount, setClickCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let [noMore, setNoMore] = useState(false);

  let handleLoadMore = () => {
    setLoading(true);

    let nextPage = clickCount + 2; // 처음은 data2.json, 그다음 data3.json
    let url = `https://codingapple1.github.io/shop/data${nextPage}.json`;

    axios.get(url)
    .then((result)=>{
      let copy = [...shoes, ...result.data];
      setShoes(copy);
      setClickCount(clickCount + 1);
      setLoading(false);
    })
    .catch(()=>{
      console.log('실패');
      setNoMore(true);
      setLoading(false);
    })
  }

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
      
      {loading && <p className='text-center mt-3'>로딩중입니다..</p>}
      {!noMore && <button onClick={ handleLoadMore }>더보기</button>}
      {noMore && <p className='text-center mt-3'>더이상 상품이 존재하지 않습니다.</p>}
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