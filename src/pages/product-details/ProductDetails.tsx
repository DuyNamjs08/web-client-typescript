import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Helmet from '../../components/helmet/Helmet';
import CommonSection from '../../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import './product-details.scss';
import { doc, getDoc, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase-Config';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/action';
import ProductCard from '../../components/UI/product-card/ProductCard';
//   const { id, title, price, category, description, img } = data;

interface Data {
  id:string,
  title:string,
  price:string,
  category:string,
  description:string,
  img:any,

}
function ProductDetails () {
  const currentUser = useSelector((state: any) => state.ReducerCheckout.currentUser);
  const [allProducts, setAllProducts] = useState([]);
  const [data, setData] = useState<Data>();
  const [loading, setloading] = useState(false);
  const { idProduct } = useParams();
  const [previewImg, setPreviewImg] = useState('');
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [listComments, setListComments] = useState([]);

  const handleView = useCallback(async () => {
    const docRef = doc(db, 'product', idProduct as string);
    const docSnap = await getDoc(docRef);
    const querySnapshot = await getDocs(collection(db, 'product'));
    if (docSnap.exists()) {
      try {
        setData(docSnap.data() as Data);
        setPreviewImg(docSnap.data().img[0].img);
        setloading(true);
        const list: any = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          const commonProduct = list.filter(
            (item: any) => item.category === docSnap.data().category
          );
          setAllProducts(commonProduct);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('No such document!');
    }
  }, [idProduct]);

  const hadleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment === undefined || comment === '') {
      return;
    }
    const res = await addDoc(collection(db, 'comments'), {
      comment,
      currentUser,
      timestamp: serverTimestamp()
    });
    console.log('res:', res);
  };
  const AllListComments = async () => {
    const getComments = await getDocs(collection(db, 'comments'));
    try {
      const listComents: any = [];
      getComments.forEach((doc) => {
        listComents.push({ id: doc.id, ...doc.data() });
      });
      setComment('');
      setListComments(listComents);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('listcomments', listComments);

  const { id, title, price, category, description, img } = data as Data;

  useEffect(() => {
    if (idProduct !== undefined && idProduct !== '') {
      handleView();
      // window.scroll(0, 0);
      // AllListComments()
    }
  }, [idProduct]);
  useEffect(() => {
    AllListComments();
  }, []);

  console.log('comments:', comment);
  // console.log("category:", category);
  // console.log("AllProducts:", allProducts);
  // console.log("loading:", loading);

  return (
    data
      ? (
      <Helmet title="Product-Details">
        <CommonSection title={title} />
        <section className="product__details__container">
          <Container>
            <Row>
              <Col lg="2" md="2">
                <div className="product__images mt-5 ">
                  {loading ? (
                    data.img.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="img__item mb-3"
                        onClick={() => setPreviewImg(item.img)}
                      >
                        <img src={item.img} alt="" className="w-100" />
                      </div>
                    ))
                  ) : (
                    <div>Loading.....</div>
                  )}
                </div>
              </Col>
              <Col lg="4" md="4">
                <div className="product__main-img">
                  {loading ? (
                    <img src={previewImg} alt="" className="w-100" />
                  ) : (
                    <div>Loading.....</div>
                  )}
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="single__product-content">
                  <h2 className="product__title mb-3">{title} </h2>
                  <p className="product__price">
                    Price: <span>{price}</span>
                  </p>
                  <p className="category mb-5">
                    Category: <span>{category}</span>
                  </p>
                  <div className="tab__content">
                    <p>{description}</p>
                  </div>
                  <button
                    className="addTOCart__btn"
                    onClick={() => dispatch(addItem({ id, title, img, price }))}
                  >
                    Add to Cart
                  </button>
                </div>
              </Col>
              <Col lg="12">
                <div className="tabs d-flex align-items-center gap-5 pt-5 pb-3">
                  <h6 className="tab__active">Review</h6>
                </div>

                <div className="tab__form">
                  <Row>
                    <Col lg="12">
                      <p>Nhap noi dung comment</p>{' '}
                    </Col>
                    <Col lg="12">
                      <form onSubmit={hadleAddComment}>
                        <div className="">
                          <textarea
                            onChange={(e) => setComment(e.target.value)}
                            rows={2}
                            placeholder="Write your review"
                          />
                        </div>
                        <button type="submit" className="addTOCart__btn">
                          Submit
                        </button>
                      </form>
                    </Col>
                  </Row>
                  <div className="review pt-2">
                    <Row>
                      {listComments && listComments.length > 0
                        ? (listComments.map((item :any) => (
                          <div key={item.id}>
                            <Col lg="2" md="2">
                              <p className="user__name mb-0">Binh luan {currentUser}</p>
                            </Col>
                            <Col lg="10" md="10">
                              <p className="feedback__text m-0">{item.comment}</p>
                              <p className="feedback__text m-0">{/* {item.timestamp} */}</p>
                            </Col>
                          </div>
                          ))
                          ) : (
                        <Col lg="12"> No comments</Col>
                          )}
                    </Row>
                  </div>
                </div>
              </Col>
              {/* ======== release product  */}

              <Col lg="12" className="mb-5 mt-4">
                <h2 className="related__Product-title">Release Product</h2>
              </Col>

              {loading ? (
                allProducts
                  .filter((item:any) => item.category === category)
                  .map((item :any) => (
                    <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                      <ProductCard item={item} />
                    </Col>
                  ))
              ) : (
                <div>Loading....</div>
              )}
            </Row>
          </Container>
        </section>
      </Helmet>
        ) : <div></div>
  );
}

export default ProductDetails;
