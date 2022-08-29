import React, { useRef, useEffect } from 'react';
import logo from '../../assets/images/img/tinder.png';
import { Container } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import './header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../redux/action';
import MenuHeader from '../UI/menu-header/MenuHeader';
const dataHeader = [
  { display: 'Home', path: 'home' },
  { display: 'Products', path: 'product' },
  { display: 'Cart', path: 'cartpage' },
  { display: 'Contact', path: 'contact' }
];

function Header () {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state:any) => state.ReducerCheckout.totalQuantity);
  const currentUser = useSelector((state:any) => state.ReducerCheckout.currentUser);
  const totalAmount = useSelector((state:any) => state.ReducerCheckout.totalAmount);
  const cartAr = useSelector((state:any) => state.ReducerCheckout.cartAr);
  console.log('totalQuantity:', totalQuantity);
  console.log('totalAmount:', totalAmount);
  console.log('cartAr:', cartAr);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => menuRef.current?.classList.toggle('show__menu');

  const onScrollHandler = (e: Event):void => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current?.classList.add('header__shrink');
    } else {
      headerRef.current?.classList.remove('header__shrink');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler, true);
    return () => window.removeEventListener('scroll', onScrollHandler, true);
  }, []);
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="" />
            </Link>
            <h5>Chill Shop</h5>
          </div>
          {/* ======menu======= */}
          <div className="naviagtion" ref={menuRef}>
            <div className="menu d-flex align-items-center gap-5">
              <p onClick={toggleMenu}>x</p>
              {dataHeader.map((item) => (
                <NavLink
                  onClick={toggleMenu}
                  key={item.display}
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? 'active__menu' : ''
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>
          {/* ====right menu ===== */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={() => dispatch(toggleCart())}>
              <i className="ri-shopping-bag-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>
            <span className="user">
              {/* <Link to="/profile">
                <i className="ri-user-line"></i>
              </Link> */}
              <MenuHeader />
            </span>
            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
            <span className="d-flex header__avatar align-items-center">
              <Link className='text-decoration-none text-dark' to="/profile">

                {currentUser ? <div className="text-center">
                <img src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" alt="" />
                <p className="mb-0">{currentUser}</p>
                </div> : ''}
              </Link>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
