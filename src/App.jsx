import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Main from './pages/Main.jsx';
import Detail from './pages/Detail.jsx';
import Cart from './pages/Cart.jsx';

export let Context1 = createContext()

function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ))
  }, [])

  let [shoes, setShoes] = useState(data);
  let [inventory, setInventory] = useState([10, 11, 12]);

  let navigate = useNavigate();

  return (
    <div className="App">


      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/1')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={ <Main shoes={shoes} setShoes={setShoes} /> } />

        <Route path="/detail/:id" element={ 
          <Context1.Provider value={ {inventory} }>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        
        <Route path="/about" element={ <About /> }>
          <Route path="member" element={ <div>멤버임</div> } />
          <Route path="location" element={ <div>위치정보임</div> } />
        </Route>
        
        <Route path="/event" element={ <Event /> }>
          <Route path="one" element={ <div>첫 주문시 양배추즙 서비스</div> } />
          <Route path="two" element={ <div>생일기념 쿠폰받기</div> } />
        </Route>
        
        <Route path="/cart" element={ <Cart /> }></Route>

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
