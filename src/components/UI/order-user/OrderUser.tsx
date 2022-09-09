import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase-Config";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const TR = (props:any) => {
  const { item, index, setData } =props
    const idUser:any = auth?.currentUser?.uid;
  const handleDelete = async (id:string) => {
    await deleteDoc(doc(db, "orders", id));
    const querySnapshot = await getDocs(collection(db, "orders"));
    const list:any = [];
    querySnapshot.forEach((doc) => {
      list.push({ idOder: doc.id, ...doc.data() });
    });
    setData(list.filter((item:any) => item.cartAr[0].idUser === idUser));
  };
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{item.idOder}</td>
      <td>{item.email}</td>
      <td>
        {item.cartAr.map((a:any, i:any) => (
          <div key={i}>
            <img
              style={{ width: 30, height: 30, objectFit: "cover" }}
              src={a.img[0].img}
              alt=""
            />
          </div>
        ))}
      </td>
      <td>
        {new Date(
          item.currTime.seconds * 1000 + item.currTime.nanoseconds / 1000000
        ).toLocaleDateString()}
      </td>
      <td>
        {item.cartAr.reduce((acc:any, cur:any) => acc + Number(cur.totalPrice), 0)}
      </td>
      <td>{item.confirm}</td>
      <td style={{textAlign:'center'}} onClick={() => handleDelete(item.idOder)}>
        <DeleteOutlineOutlinedIcon />
      </td>
    </tr>
  );
};

function OrderUser(props:any) {
  const [data, setData] = useState<any>();
  const idUser:any = auth?.currentUser?.uid;
  //   console.log("idUser:", idUser);

  useEffect(() => {
    const getdata = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const list:any = [];
      querySnapshot.forEach((doc) => {
        list.push({ idOder: doc.id, ...doc.data() });
      });
      setData(list.filter((item:any) => item.cartAr[0].idUser === idUser));
    };
    getdata();
  }, []);
  console.log("data", data);

  return (
    <Col lg="9" className="details__user">
      <p className="common__info mb-5 ">DƠN HÀNG CỦA BẠN</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Code Order</th>
            <th scope="col">Email</th>
            <th scope="col">img</th>
            <th scope="col">Create</th>
            <th scope="col">Sub Price</th>
            <th scope="col">Status</th>
            <th scope="col">Delete Order</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((item:any, index:any) => (
              <TR
                key={item.idOder}
                item={item}
                index={index}
                setData={setData}
              />
            ))
          ) : (
            <tr>
              <td>index</td>
            </tr>
          )}
        </tbody>
      </table>
    </Col>
  );
}

export default OrderUser;
