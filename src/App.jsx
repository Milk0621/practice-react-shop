import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link } from 'react-router-dom'
import Main from './Main.jsx';
import Detail from './Detail.jsx';


function App() {

  let [shoes, setShoes] = useState(data);

  return (
    <div className="App">


      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={ <Main shoes={shoes} /> } />
        <Route path="/detail" element={ <Detail /> } />
      </Routes>
    

    </div>
  );
}

function Product(props){
  return(
    <Col>
      <img src={props.src} width='80%'/>
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </Col>
  )
}

export default App;
