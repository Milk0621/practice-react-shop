import { Container, Row, Col } from 'react-bootstrap';

function Main({ shoes }) {
  return (
    <>
      <div className="main-bg"></div>
      <Container fluid>
        <Row>
          {shoes.map((shoe, i) => (
            <Product
              key={shoe.id}
              shoe={shoe}
              src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

function Product(props) {
  return (
    <Col>
      <img src={props.src} width="80%" />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </Col>
  );
}

export default Main;