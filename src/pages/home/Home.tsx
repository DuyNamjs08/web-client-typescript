import React, { useState, useEffect } from "react";
import Helmet from "../../components/helmet/Helmet";
import { Container, Col, Row, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

// api firebase
// import heroImg from "../assets/images/hero.png";
import HeroSection from "../../components/UI/hero-section/HeroSection";
import {
  collection,
  // getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-Config";
import "./home.scss";
import "./hero-section.scss";
import Category from "../../components/UI/category/Category";

// delivery
import featureImg01 from "../../assets/images/1.png";
import featureImg02 from "../../assets/images/2.png";
import featureImg03 from "../../assets/images/3.png";

// catagory all product
// import products from "../assets/fake-data/products.js";
import ProductCard from "../../components/UI/product-card/ProductCard";

// why choose we
import whyImg from "../../assets/images/location.png";

// testimonial
import TestimonialSlider from "../../components/UI/silder/TestimonialSlider";
import networkImg from "../../assets/images/network.png";

// static data
const featureData = [
  {
    title: "Quick Delivery",
    imgUrl: featureImg01,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },

  {
    title: "Super Beauty",
    imgUrl: featureImg02,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
  {
    title: "Easy Pick Up",
    imgUrl: featureImg03,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
];
function Home() {
  const currentUser = useSelector((state:any) => state.ReducerCheckout.currentUser);
  const takeName = useSelector((state:any) => state.ReducerCheckout.takeName);
  const cartAr = useSelector((state:any) => state.ReducerCheckout.cartAr);
  const totalQuantity = useSelector((state:any) => state.ReducerCheckout.totalQuantity);
  const totalAmount = useSelector((state:any) => state.ReducerCheckout.totalAmount);
  const takeUid = useSelector((state:any) => state.ReducerCheckout.takeUid);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotProduct, setHotProduct] = useState([]);
  

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("name", JSON.stringify(takeName));
    localStorage.setItem("cart", JSON.stringify(cartAr));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("uid", JSON.stringify(takeUid));
}, [currentUser,takeName,cartAr,totalQuantity,totalAmount,takeUid]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "product"),
      (snapShot) => {
        let list:any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        // console.log(list);
        setAllProducts(list);
        const filterCategory = list.filter(
          (item:any) => item.category === "Man Shoes"
        );
        const eachCatagory = filterCategory.slice(0, 4);
        setHotProduct(eachCatagory);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  useEffect(() => {
    window.scroll(0,0)
   }, []);
  const Loading = () => {
    return <div>loading .....</div>;
  };
  const ShowProduct = () => {
    return (
      <Row>
        {allProducts.map((item:any,index) => (
          <Col key={index} lg="3" md="6" sm="6" xs="12"  className="mt-5">
            <ProductCard item={item} />
          </Col>
        ))}
      </Row>
    );
  };

  
  return (
    <Helmet title="home">
      <section className="pt-0">
        <HeroSection />
      </section>
      {/* ==== end hero ========  */}
      <section className="pt-0 pb-1">
        <Category />
      </section>
      {/* ======== end catagory ========  */}
      
      {/* ===== end title ===== */}

      <section className="pt-0 pb-4">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Popular Products</h2>
            </Col>
            <div>{loading ? <Loading /> : <ShowProduct />}</div>
          </Row>
        </Container>
      </section>

      {/* ========= end all item catagory ======== */}
      <section className="why__choose-us pt-0 pb-0">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Chill Shop?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum, minus. Tempora reprehenderit a corporis velit,
                  laboriosam vitae ullam, repellat illo sequi odio esse iste
                  fugiat dolor, optio incidunt eligendi deleniti!
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Fresh and
                      tasty foods
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Quia, voluptatibus.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Quality
                      support
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui, earum.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i>Order from any
                      location{" "}
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui, earum.
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========== end why choose we  */}

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5 ">
              <h2>Hot Products</h2>
            </Col>

            {hotProduct.length > 0 ? hotProduct.map((item:any) => (
              <Col lg="3" md="4" sm="6" xs="12" key={item.id}>
                <ProductCard item={item} />
              </Col>
            )) : <div>loading ......</div>}
          </Row>
        </Container>
      </section>
      {/* ===== end hot product ========= */}

      <section className="p-0">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Distinctio quasi qui minus quos sit perspiciatis inventore
                  quis provident placeat fugiat!
                </p>

                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">What we serve</h5>
              <h2 className="feature__title">Just sit back at home</h2>
              <h2 className="feature__title">
                we will <span>take care</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
                officiis?
              </p>
              <p className="feature__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, eius.
              </p>
            </Col>
            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" xs='12' key={index} className="mt-5">
                <div className="feature__item text-center px-2 py-0">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="feature__img"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Home;
