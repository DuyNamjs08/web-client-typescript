import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Routers from '../../routes/Routers';
import Cart from '../UI/cart/Cart';
import { useSelector } from 'react-redux';

function Layout () {
  const cartIsVisible = useSelector((state:any) => state.ReducerCheckout.cartIsVisible);
  // console.log('cartIsVisible',cartIsVisible);
  return (
        <div>
            <Header />
            {cartIsVisible && <Cart />}
            <div><Routers /></div>
            <Footer />
        </div>
  );
}

export default Layout;
