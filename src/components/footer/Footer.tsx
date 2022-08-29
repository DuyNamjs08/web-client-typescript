import React from 'react';
import './footer.scss';
import logo from '../../assets/images/img/tinder.png';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="4" sm="6">
            <div className="footer__logo text-start">
              <img className="img__footer" src={logo} alt="" />
              <h5>Chill Shop</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis modi quasi
                explicabo, voluptatibus corrupti dolore
              </p>
            </div>
          </Col>
          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Delivery Time</h5>
            <ListGroup className="deliver__time-list">
              <ListGroupItem className="footer__delivery-item ps-0 border-0">
                <span>Sunday - Thursday</span>
                <p>10:00am - 11:00pm</p>
              </ListGroupItem>
              <ListGroupItem className="footer__delivery-item ps-0 border-0">
                <span>Friday - Saturday</span>
                <p>9:00am - 9:00pm</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Contact</h5>
            <ListGroup className="deliver__time-list">
              <ListGroupItem className="footer__delivery-item ps-0 border-0">
                <p>Location: Phu Ly city Ha Nam Provine</p>
              </ListGroupItem>
              <ListGroupItem className="footer__delivery-item ps-0 border-0">
                <span>Phone: 01712345678</span>
              </ListGroupItem>
              <ListGroupItem className="footer__delivery-item ps-0 border-0">
                <span>email: duynam@gmail.com</span>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Newsletter</h5>
            <p>Subscribe our newsletter</p>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <span>
                <i className="ri-send-plane-line"></i>
              </span>
            </div>
            <div className="social__links d-flex gap-5 ">
              <h5 className="m-0">Follow: </h5>
              <span>
                <Link to="/https://www.facebook.com">
                  <i className="ri-facebook-line"></i>
                </Link>
              </span>
              <span>
                <Link to="/https://github.com">
                  <i className="ri-github-line"></i>
                </Link>
              </span>
              <span>
                <Link to="/https://www.youtube.com">
                  <i className="ri-youtube-line"></i>
                </Link>
              </span>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg="12" md="12">
            <p className="copyright__text">
              Copyright - 2022, website made by Duy Nam. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
