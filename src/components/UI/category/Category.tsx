import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import categoryImg01 from "../../../assets/img-category/shoe1.png";
import categoryImg02 from "../../../assets/img-category/shoe3.png";
import categoryImg03 from "../../../assets/img-category/shoe4.png";
import categoryImg04 from "../../../assets/img-category/shoe5.png";
import './category.scss';
const categoryData = [
  {
    display: "Man Shoe",
    imgUrl: categoryImg01,
  },
  {
    display: "Woman Shoe",
    imgUrl: categoryImg02,
  },
  {
    display: "Children Shoe",
    imgUrl: categoryImg03,
  },
  {
    display: "Sandal",
    imgUrl: categoryImg04,
  },
];

function Category () {
  return (
    <Container>
      <Row>
        {categoryData.map((item, index) => (
          <Col lg="3" md="4" sm="6" xs="12" className="mb-4" key={index}>
            <div className="category__item d-flex align-items-center gap-3">
              <div className="category__img">
                <img src={item.imgUrl} alt="category__item" />
              </div>
              <h6>{item.display}</h6>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Category;
