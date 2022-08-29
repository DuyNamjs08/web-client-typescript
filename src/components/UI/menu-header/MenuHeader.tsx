import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logoutStart } from '../../../redux/action';

function MenuHeader () {
  const dispatch = useDispatch();
  const currentUser = useSelector((state:any) => state.ReducerCheckout.currentUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="MenuHeader">
      <div onClick={handleClick}>
        <i className="ri-user-line"></i>
      </div>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        {currentUser ? (
          <MenuItem onClick={handleClose}>
            <Link className="d-flex align-items-center gap-2 text-decoration-none text-dark" to="/profile">
              <i className="ri-file-user-line"></i>My Profile
            </Link>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>
            <Link className="d-flex align-items-center gap-2 text-decoration-none text-dark" to="/login">
              <i className="ri-logout-circle-r-line"></i>Login
            </Link>
          </MenuItem>
        )}

        {currentUser ? (
          <MenuItem onClick={handleClose}>
            <p
              onClick={() => dispatch(logoutStart())}
              className="d-flex align-items-center gap-2"
            >
              <i className="ri-logout-circle-r-line"></i>Logout
            </p>
          </MenuItem>
        ) : (
          ''
        )}
      </Menu>
    </div>
  );
}

export default MenuHeader;
