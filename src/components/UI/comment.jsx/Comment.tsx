import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../../firebase/firebase-Config";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Moment from "react-moment";
import Progess from "../progess/Progess";

function Comment() {
  const currentUser = useSelector((state:any) => state.ReducerCheckout.currentUser);
  const [comment, setComment] = useState("");
  const [data, setData] = useState<any>();
  const { idProduct } = useParams();
  const [rate, setRate] = useState(0);

  
  const docRef = doc(db, "comments", idProduct as string);
  const hadleAddComment = async (e:any) => {
    e.preventDefault();
    const commentUser = [
      {
        idUser: currentUser,
        commentTitle: comment,
        rate: rate,
        currentdate: new Date(),
      },
    ];
    setComment("");
    try {
      await setDoc(doc(db, "comments", idProduct as string), {
        commentUser: [...commentUser],
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    if (data) {
      const commentUser = [
        ...data.commentUser,
        {
          idUser: currentUser,
          commentTitle: comment,
          rate: rate,
          currentdate: new Date(),
        },
      ];
      try {
        await setDoc(doc(db, "comments", idProduct as string), {
          commentUser: [...commentUser],
          timeStamp: serverTimestamp(),
        });
      } catch (err) {
        console.log(err);
      }
    }
    const docSnap = async () => {
      await getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setData({ ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      });
    }
    docSnap();
  };
  useEffect(() => {
    const docSnap = async () => {
      await getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setData({ ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      });
    };
    docSnap();
  }, []);
  // ===== ratting ======
  const handleChangeRatting = (e:any, value:any) => {
    setRate(value);
  };
  const tRate = data?.commentUser.filter((item:any) => item.rate > 0);

  const tRate1 = data?.commentUser.filter((item:any) => item.rate === 1).length;
  const progess1 = data ? (tRate1 / tRate.length) * 100 : 0;

  const tRate2 = data?.commentUser.filter((item:any) => item.rate === 2).length;
  const progess2 = data ? (tRate2 / tRate.length) * 100 : 0;

  const tRate3 = data?.commentUser.filter((item:any) => item.rate === 3).length;
  const progess3 = data ? (tRate3 / tRate.length) * 100 : 0;

  const tRate4 = data?.commentUser.filter((item:any) => item.rate === 4).length;
  const progess4 = data ? (tRate4 / tRate.length) * 100 : 0;

  const tRate5 = data?.commentUser.filter((item:any) => item.rate === 5).length;
  const progess5 = data ? (tRate5 / tRate.length) * 100 : 0;

  const calRate = tRate ? tRate.reduce((acc:any, cur:any) => acc + cur.rate, 0) : 0;
  const tbRate = calRate ? Math.floor(calRate / tRate.length) : 0;

  console.log(progess1, progess2, progess3, progess4, progess5);
  console.log(data);
  return (
    <div>
      <Row>
        <Col lg="4">
          <h3>danh gia</h3>
          {tbRate ? (
            <Rating defaultValue={tbRate} precision={0.5} />
          ) : (
            "loading..."
          )}

          <p> {data ? data.commentUser.length : "0"} nhan xet </p>
        </Col>
        <Col lg="6">
          <div className="d-flex align-items-center">
            <Col lg="6" className="d-flex align-items-center gap-4">
              <Rating defaultValue={5} precision={0.5} /> {tRate5 ? tRate5 : 0}
            </Col>
            <Col lg="6">
              <Progess progess={progess5} />
            </Col>
          </div>
          <div className="d-flex align-items-center">
            <Col lg="6" className="d-flex align-items-center gap-4">
              <Rating defaultValue={4} precision={0.5} /> {tRate4 ? tRate4 : 0}
            </Col>
            <Col lg="6">
              <Progess progess={progess4} />
            </Col>
          </div>
          <div className="d-flex align-items-center">
            <Col lg="6" className="d-flex align-items-center gap-4">
              <Rating defaultValue={3} precision={0.5} /> {tRate3 ? tRate3 : 0}
            </Col>
            <Col lg="6">
              <Progess progess={progess3} />
            </Col>
          </div>
          <div className="d-flex align-items-center">
            <Col lg="6" className="d-flex align-items-center gap-4">
              <Rating defaultValue={2} precision={0.5} /> {tRate2 ? tRate2 : 0}
            </Col>
            <Col lg="6">
              <Progess progess={progess2} />
            </Col>
          </div>
          <div className="d-flex align-items-center">
            <Col lg="6" className="d-flex align-items-center gap-4">
              <Rating defaultValue={1} precision={0.5} /> {tRate1 ? tRate1 : 0}
            </Col>
            <Col lg="6">
              <Progess progess={progess1} />
            </Col>
          </div>
        </Col>
        <Col lg="12">
          <p>Nhap noi dung comment</p>
        </Col>
        <Col lg="12">
          <form onSubmit={hadleAddComment}>
            <div className="d-flex mb-2 gap-5">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                placeholder="Write your review"
              />
              <div>
                <h3>Ratting</h3>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating"
                    onChange={handleChangeRatting}
                    defaultValue={0}
                    precision={0.5}
                  />
                </Stack>
              </div>
            </div>
            <button type="submit" className="addTOCart__btn">
              Submit
            </button>
          </form>
        </Col>
        <div className="review pt-2">
          <Row className="d-flex flex-column-reverse">
            {data?.commentUser !== undefined ? (
              data.commentUser.map((item:any, index:any) => (
                <div key={index}>
                  <Col lg="2" md="2">
                    <p className="user__name mb-0">{item.idUser}</p>
                  </Col>
                  <Col lg="10" md="10" className="d-flex gap-5">
                    <div>
                      <p className="feedback__text m-0">{item.commentTitle}</p>
                      <p className="feedback__text m-0">
                        <Moment format="YYYY/MM/DD">
                          {item.commentUser?.currentdate}
                        </Moment>
                      </p>
                    </div>
                    <Stack spacing={1}>
                      {item.rate ? (
                        <Rating
                          name="half-rating"
                          defaultValue={item.rate}
                          precision={0.5}
                          readOnly
                        />
                      ) : (
                        <Rating
                          name="half-rating"
                          defaultValue={0}
                          precision={0.5}
                          readOnly
                        />
                      )}
                    </Stack>
                  </Col>
                </div>
              ))
            ) : (
              <Col lg="12"> No comments</Col>
            )}
          </Row>
        </div>
      </Row>
    </div>
  );
}

export default Comment;
