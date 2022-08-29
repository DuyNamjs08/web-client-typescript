import { ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import './cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../../redux/action';

function Cart () {
  const dispatch = useDispatch();
  const cartAr = useSelector((state:any) => state.ReducerCheckout.cartAr);
  const totalAmount = useSelector((state:any) => state.ReducerCheckout.totalAmount);
  console.log('cartAr:::::', cartAr);
  return (
    <div className="cart__container">
      <ListGroup className="cart">
        <div className="cart__close" onClick={() => dispatch(toggleCart())}>
          <span>
            <i className="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list">
          {cartAr.length === 0 ? (
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
            cartAr.map((item:any) => (
              <CartItem item={item} key={item.id} />
            ))
          )}
          {/* <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem /> */}
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            Total Bill : <span>${totalAmount}</span>
          </h6>
          <button>
            <Link onClick={() => dispatch(toggleCart())} to="/checkout">Checkout</Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
}

export default Cart;
