import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import './App.css';
import { createContext, Suspense, lazy, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Main from './pages/Main.jsx';
// import Detail from './pages/Detail.jsx';
// import Cart from './pages/Cart.jsx';
import { useQuery } from 'react-query';
import axios from 'axios';

const Detail = lazy(()=> import('./pages/Detail.jsx'))
const Cart = lazy(()=> import('./pages/Cart.jsx'))

export let Context1 = createContext()

function App() {

  let watched = JSON.parse(localStorage.getItem('watched'))
  useEffect(()=>{
    !watched && (
      localStorage.setItem('watched', JSON.stringify( [] ))
    )
  }, [])

  let [shoes, setShoes] = useState(data);
  let [inventory, setInventory] = useState([10, 11, 12]);

  let navigate = useNavigate();

  let result = useQuery('작명', ()=>axios.get('https://codingapple1.github.io/userdata.json').then(
    (a)=> a.data
  ))

  return (
    <div className="App">


      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className='me-auto'>
            { result.isLoading && '로딩중' }
            { result.error && '에러' }
            { result.data && result.data.name }
          </Nav>
          {watched.map((watch, i) => (
            <img style={{width:'5%', cursor:'pointer'}} src={`https://codingapple1.github.io/shop/shoes${shoes[watch].id + 1}.jpg`} onClick={()=>{navigate(`/detail/${shoes[watch].id}`)}} />
          ))}
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={ <Main shoes={shoes} setShoes={setShoes} /> } />

        <Route path="/detail/:id" element={ 
          <Suspense fallback={<div>페이지 로딩중..</div>}>
            <Context1.Provider value={ {inventory} }>
              <Detail shoes={shoes} />
            </Context1.Provider>
          </Suspense>
        } />
        
        <Route path="/about" element={ <About /> }>
          <Route path="member" element={ <div>멤버임</div> } />
          <Route path="location" element={ <div>위치정보임</div> } />
        </Route>
        
        <Route path="/event" element={ <Event /> }>
          <Route path="one" element={ <div>첫 주문시 양배추즙 서비스</div> } />
          <Route path="two" element={ <div>생일기념 쿠폰받기</div> } />
        </Route>
        
        <Route path="/cart" element={ 
          <Suspense fallback={<div>페이지 로딩중..</div>}>
            <Cart />
          </Suspense>
        }></Route>

        <Route path="*" element={ <div>없는 페이지입니다.</div> } />
      </Routes>
    

    </div>
  );
}

function About(){
    return(
      <div>
        <h4>회사정보임</h4>
        <Outlet></Outlet>
      </div>
    )
}

function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
