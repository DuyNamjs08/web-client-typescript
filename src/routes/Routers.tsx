import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from '../pages/products/Products';
import CartPage from '../pages/cart-page/CartPage';
import CheckOut from '../pages/checkout/CheckOut';
import Contact from '../pages/contact/Contact';
import ProductDetails from '../pages/product-details/ProductDetails';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import ProfileUser from '../pages/profile-user/ProfileUser';
import CheckSuccess from '../pages/checkout-success/CheckSuccess';
import { useSelector } from 'react-redux';

function Routers () {
  const { currentUser } = useSelector((state :any) => state.ReducerCheckout);
  const RequireAuth = (props:any) => {
    const { children } = props;
    console.log('RequireAuth::', currentUser);
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='home' element={<Home />} />
            <Route path='product' element={<Products />} />
            <Route path='product/:idProduct' element={<ProductDetails />} />
            <Route path='cartpage' element={<CartPage />} />
            <Route path='checkout' element={<RequireAuth><CheckOut /></RequireAuth>} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='contact' element={<Contact />} />
            <Route path='profile' element={<ProfileUser />} />
            <Route path='success' element={<CheckSuccess />} />

        </Routes>
  );
}

export default Routers;
