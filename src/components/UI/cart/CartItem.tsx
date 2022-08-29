import React from 'react';
import { ListGroupItem } from 'reactstrap';
import './cart-shoping.scss';
import { addItem, removeItem, deleteItem } from '../../../redux/action';
import { useDispatch } from 'react-redux';

function CartItem (props:any) {
  const dispatch = useDispatch();
  const { id, title, price, img, quantity, totalPrice } = props.item;
  console.log('id:::', id);
  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={img[0].img} alt="product-img" />

        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{title}</h6>
            <p className=" d-flex align-items-center gap-5 cart__product-price">
              {quantity}x <span>${price}</span> <span>SubTotal: {totalPrice}$</span>
            </p>
            <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="increase__btn" onClick={() => dispatch(addItem({ id, title, img, price }))}>
                <i className="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease__btn" onClick={() => dispatch(removeItem(id))}>
                <i className="ri-subtract-line"></i>
              </span>
            </div>
          </div>

          <span className="delete__btn" onClick={() => dispatch(deleteItem(id))}>
            <i className="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
}

export default CartItem;
