import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Helmet from '../../components/helmet/Helmet';
import CommonSection from '../../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import './product-details.scss';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db,auth } from '../../firebase/firebase-Config';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/action';
import ProductCard from '../../components/UI/product-card/ProductCard';
import Comment from '../../components/UI/comment.jsx/Comment';
import TitleLink from '../../components/UI/title-link/TitleLink';

interface DataProduct {
  category: string;
  title: string;
  price: any;
  stock: any;
  description: string;
  img: any;
  id: string;
}
function ProductDetails() {
  const idUser=auth?.currentUser?.uid
  const [allProducts, setAllProducts] = useState([]);
  const [data, setData] = useState<any>({});
  const [loading, setloading] = useState(false);
  const { idProduct } = useParams();
  const [previewImg, setPreviewImg] = useState<any>();
  const dispatch = useDispatch();
  const titleDetail = 'Product Details';
  // =======comment ======

  const handleView = useCallback(async () => {
    const docRef = doc(db, 'product', idProduct as string);
    const docSnap = await getDoc(docRef);
    const querySnapshot = await getDocs(collection(db, 'product'));
    try {
      setData(docSnap.data() as DataProduct);
      setPreviewImg(docSnap?.data()?.img[0]?.img);
      setloading(true);
      let list: any = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        const commonProduct = list.filter(
          (item: any) => item.category === docSnap?.data()?.category
        );
        setAllProducts(commonProduct);
      });
    } catch (error) {
      console.log('No such document!');
    }
  }, [idProduct]);

  const {  title, price, category, description, img, stock, size } = data;
  console.log('data:', data);
  useEffect(() => {
    if (idProduct !== undefined && idProduct !== '') {
      handleView();
    }
  }, [idProduct]);

  return (
    <Helmet title="Product-Details">
      <CommonSection title={titleDetail} />
      <TitleLink idProduct={idProduct} />
      <section className="product__details__container">
        <Container>
          <Row>
            <Col lg="4" md="6">
              <div className="preview__img__container">
                {loading ? (
                  <img src={previewImg} alt="" className="preview__img" />
                ) : (
                  <div>Loading.....</div>
                )}
                <div className="d-flex gap-4 mt-4">
                  {loading ? (
                    data.img.map((item: any, index: any) => (
                      <div
                        key={index}
                        className="img__item mb-3 d-flex"
                        onClick={() => setPreviewImg(item.img)}
                      >
                        <img src={item.img} alt="" className="img__bottom" />
                      </div>
                    ))
                  ) : (
                    <div>Loading.....</div>
                  )}
                </div>
              </div>
            </Col>
            <Col lg="8" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-2">{title} </h2>
                <p className="product__price">
                  Price: <span>{price}($)</span>
                </p>
                <p className="category mb-2">
                  Category: <span>{category}</span>
                </p>
                <p className="category">
                  Status: In stock <span>{stock}</span>
                </p>
                <div className='size__container'>
                  <p className='choose__size'>Choose Size</p>
                  <div className="product__size">
                    {data
                      ? data.size?.map((item: any) => (
                          <div className="product__size__item" key={item.id}>
                            {item.sizePd}
                          </div>
                        ))
                      : 'Product has No Size'}
                  </div>
                </div>
                <div className="tab__content">
                  <p>{description}</p>
                </div>
                <button
                  className="addTOCart__btn"
                  onClick={() => dispatch(addItem({ id:idProduct, title, img, price, stock,idUser }))}
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
                <Comment />
              </div>
            </Col>
            {/* ======== release product  */}

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">Release Product</h2>
            </Col>

            {loading ? (
              allProducts
                .filter((item: any) => item.category === category)
                .map((item, index: any) => (
                  <Col lg="3" md="4" sm="6" xs="12" className="mb-4" key={index}>
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
  );
}

export default ProductDetails;
