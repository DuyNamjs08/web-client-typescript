import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutStart } from "../../redux/action";
import { Container, Row, Col } from "reactstrap";
import "./profile.scss";
import InfoUser from "../../components/UI/info-user/InfoUser";
import OrderUser from "../../components/UI/order-user/OrderUser";
import UpdateUser from "../../components/UI/update-user/UpdateUser";
import {db} from '../../firebase/firebase-Config'
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";

function ProfileUser() {
  const takeUid = useSelector((state:any) => state.ReducerCheckout.takeUid);
  const dispatch = useDispatch();
  const [state, setState] = useState("info");
  const [img, setImg] = useState(null);
  const render = () => {
    if (state === "info") {
      return <InfoUser setState={setState} />;
    } else if (state === "order") {
      return <OrderUser />;
    } else if (state === "update") {
      return <UpdateUser />;
    }
  };
  useEffect(() => {
    const getImg = async () => {
      const docRef = doc(db, "user", takeUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImg(docSnap.data()?.img);
      }
    };
    getImg()
  }, []);
  useEffect(() => {
    window.scroll(0,0)
  }, []);

  return (
    <section className="profile__container">
      <Container>
        {/* <button onClick={()=>dispatch(logoutStart())}>logout</button> */}
        <Row>
          <Col lg="3" className="profile__user text-center ">
            <img
              src={`${img ? img : "https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" }`}
              alt=""
            />
            <h6 className=" mb-3">
              Xin chao : <span>Duy Nam</span>
            </h6>
            <ul className="list-group d-flex flex-column ">
              <li
                onClick={() => setState("info")}
                className="list-group-item d-flex gap-2"
              >
                <i className="ri-home-2-line"></i>Thông tin tài khoản
              </li>
              <li
                onClick={() => setState("order")}
                className="list-group-item d-flex gap-2"
              >
                <i className="ri-file-list-line"></i>Quản lý đơn hàng
              </li>
              <li className="list-group-item d-flex gap-2">
                <i className="ri-building-line"></i>Danh sách địa chỉ
              </li>
              <li
                className="list-group-item d-flex gap-2"
                onClick={() => dispatch(logoutStart())}
              >
                <i className="ri-logout-circle-r-line"></i>Đăng xuất
              </li>
            </ul>
          </Col>
          {/* <InfoUser /> */}
          {render()}
        </Row>
      </Container>
    </section>
  );
}

export default ProfileUser;
