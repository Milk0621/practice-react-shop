import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import data from './data.js';


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

      <div className='main-bg'></div>

      <Container fluid>
        <Row>
          { shoes.map((shoe, i)=>{
              return(
                <Product key={shoe.id} shoe={shoe} src={`https://codingapple1.github.io/shop/shoes${i+1}.jpg`}></Product>
              )
            }) 
          }
        </Row>
      </Container>

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
