import React from 'react';
import { useNavigate } from 'react-router-dom';
import './modal-confirm.scss';
import { deleteAll } from '../../../redux/action';
import { useDispatch } from 'react-redux';

function ModalConfirm (props:any) {
  const { setOpenModal, authCheckOut } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderSuccess = () => {
    authCheckOut();
    navigate('/success');
    dispatch(deleteAll());
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body__confirm">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div>
        <div className="footer__confirm">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button type="submit" onClick={orderSuccess}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
