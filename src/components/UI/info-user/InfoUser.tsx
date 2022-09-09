import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-Config";
import {useSelector} from 'react-redux'

function InfoUser(props:any) {
  const { setState }=props
  const takeUid = useSelector((state:any) => state.ReducerCheckout.takeUid);
  const [data, setData] = useState<any>();

  const getUser = async () => {
    const docRef = doc(db, "user",takeUid as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
//   console.log("data",data);
  return (
    <>
      <Col lg="6" className="details__user">
        <p className="common__info mb-5 ">THÔNG TIN TÀI KHOẢN</p>
        <ul>
          <li>
            <span>Họ và tên:</span>
            {data?.firstName}{data?.lastName}
          </li>
          <li>
            <span>Email:</span>
            {data?.email}
          </li>
          <li>
            <span>Địa chỉ:</span>
            {data?.address}
          </li>
          <li>
            <span>Quoc gia:</span>
            {data?.country}
          </li>
          <li>
            <span>Điện thoại:</span>
            {data?.phone}
          </li>
        </ul>
        <div className="user__rank">
          <p className="user__rank__membership">
            Hạng thẻ tiếp theo Silver - chiết khấu 3% membership
          </p>
          <p className="user__rank__details">
            Xem thêm chính sách khách hàng thân thiết.
          </p>
        </div>
        <hr />
      </Col>
      <Col lg="3" className="update__user__profile">
        <div>
          <button onClick={() => setState("update")}>
            Cập nhật thông tin tài khoản
          </button>
        </div>
      </Col>
    </>
  );
}

export default InfoUser;
