import React from 'react';
import CommonSection from '../../components/UI/common-section/CommonSection';
import Helmet from '../../components/helmet/Helmet';
import './cart-page.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { deleteItem } from '../../redux/action';

const Tr = (props:any) => {
  const { item } = props;
  const { id, img, title, price, quantity } = item;
  const dispatch = useDispatch();
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img
          src={img[0].img}
          alt=""
        />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">${price}</td>
      <td className="text-center">{quantity}</td>
      <td className="text-center cart__item-del">
        <i
          onClick={() => dispatch(deleteItem(id))}
          className="ri-delete-bin-line"
        ></i>
      </td>
    </tr>
  );
};

function CartPage () {
  const cartAr = useSelector((state:any) => state.ReducerCheckout.cartAr);
  const totalAmount = useSelector((state:any) => state.ReducerCheckout.totalAmount);
  return (
    <Helmet title="Cart-Page">
      <CommonSection title="Cart Page" />
      <section className="cartpage__container">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="pb-5">Your Item Choosen </h2>
              {cartAr.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartAr.map((item:any) => (
                      <Tr key={item.id} item={item} />
                    ))}
                  </tbody>
                </table>
              )}
              <div className="mt-4">
                <h6>
                  Subtotal: $<span className="cart__subtotal">{totalAmount}</span>
                </h6>
                <p>Taxes and shipping will calculate at checkout</p>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to="/product">Continue Shopping</Link>
                  </button>
                  <button className="addTOCart__btn">
                    <Link to="/checkout">Proceed to checkout</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default CartPage;
