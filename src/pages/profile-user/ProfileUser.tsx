import * as React from 'react';
import { useDispatch } from 'react-redux';
import { logoutStart } from '../../redux/action';
import { Container, Row, Col } from 'reactstrap';
import './profile.scss';

function ProfileUser () {
  const dispatch = useDispatch();

  return (
    <section className="profile__container">
      <Container>
        {/* <button onClick={()=>dispatch(logoutStart())}>logout</button> */}
        <Row>
          <Col lg="3" className="profile__user text-center ">
            <img
              className="w-25 mb-3"
              src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
              alt=""
            />
            <h6 className=" mb-3">
              Xin chao : <span>Duy Nam</span>
            </h6>
            <ul className="list-group d-flex flex-column ">
              <li className="list-group-item d-flex gap-2">
                <i className="ri-home-2-line"></i>Thông tin tài khoản
              </li>
              <li className="list-group-item d-flex gap-2">
                <i className="ri-file-list-line"></i>Quản lý đơn hàng
              </li>
              <li className="list-group-item d-flex gap-2">
                <i className="ri-building-line"></i>Danh sách địa chỉ
              </li>
              <li className="list-group-item d-flex gap-2" onClick={() => dispatch(logoutStart())}>
                <i className="ri-logout-circle-r-line"></i>Đăng xuất
              </li>
            </ul>
          </Col>
          <Col lg="6" className="details__user">
            <p className="common__info mb-5 ">THÔNG TIN TÀI KHOẢN</p>
            <ul>
              <li><span>Họ và tên:</span>Lữ Nam</li>
              <li><span>Email:</span>duynam11a11999@gmail.com</li>
              <li><span>Địa chỉ:</span></li>
              <li><span>Ngày sinh:</span>01/08/1999</li>
              <li><span>Điện thoại:</span></li>
            </ul>
            <div className="user__rank">
              <p className="user__rank__membership">Hạng thẻ tiếp theo Silver - chiết khấu 3% membership</p>
              <p className="user__rank__details">Xem thêm chính sách khách hàng thân thiết.</p>
            </div>
            <hr />
            <div className="detail__orders">
              <p>Bạn chưa đặt mua sản phẩm.</p>

            </div>
          </Col>
          <Col lg="3" className="update__user__profile">
           <div>
            <button>
            Cập nhật thông tin tài khoản
            </button>
           </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ProfileUser;
