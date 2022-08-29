import React, { useState, useEffect } from 'react';
import Helmet from '../../components/helmet/Helmet';
import CommonSection from '../../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import './products.scss';
// ===== category ======
import ProductCard from '../../components/UI/product-card/ProductCard';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase-Config';
// ===== paginate =========
import ReactPaginate from 'react-paginate';

function Products () {
  //   ==== call Api =======
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  //   ======= search page =======
  const [searchTerm, setSearchTerm] = useState('');
  //   ======= Paginate ========
  const [pageNumber, setPageNumber] = useState(0);
  const searchedProduct = allProducts.filter((item :any) => {
    if (searchTerm === '') {
      return item;
    }
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log('not found');
    }
  });
  const productPerPage = 4;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );
  const pageCount = Math.ceil(searchedProduct.length / productPerPage);
  const changePage = (event :any) => {
    setPageNumber(event.selected);
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'product'),
      (snapShot) => {
        const list:any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        // console.log(list);
        setAllProducts(list);
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
    window.scroll(0, 0);
  }, []);
  return (
    <Helmet title="All-Product">
      <CommonSection title="All Product" />
      <section className="product__conatiner">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="search__widget d-flex align-items-center justify-content-between mb-5 w-50">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6">
              <div className="sorting__widget text-end mb-5">
                <select className="w-50">
                  <option>Default</option>
                  <option value="ascending">Alphabetically, A-Z</option>
                  <option value="descending">Alphabetically, Z-A</option>
                  <option value="high-price">High Price</option>
                  <option value="low-price">Low Price</option>
                </select>
              </div>
            </Col>
            {loading ? (
              <div>Loading...</div>
            ) : (
              displayPage.map((item : any) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                  <ProductCard item={item} />
                </Col>
              ))
            )}
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={changePage}
              previousLabel={'Prev'}
              nextLabel={'Next'}
              containerClassName=" paginationBttns "
            />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Products;
