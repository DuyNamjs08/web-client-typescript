import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase/firebase-Config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {useNavigate} from 'react-router-dom'
import "./update-user.scss";

function UpdateUser() {
  const navigate =useNavigate()
  const takeUid = useSelector((state:any) => state.ReducerCheckout.takeUid);
  const [data, setData] = useState<any>();
  const [file, setFile] = useState<File | any>();
  const [img, setImg] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [per, setPerc] = useState<any>();

  useEffect(() => {
    const uploadFile = () => {
      const name = file && new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = storageRef && uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setData((prev:any) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      date,
      phone,
      address,
      country,
      ...data,
    };
    try {
      if (takeUid !== undefined && takeUid !== "") {
        const docRef = doc(db, "user", takeUid);
        await updateDoc(docRef, newUser);
      }
    } catch (err) {
      console.log(err);
    }

    setFirstname("");
    setLastName("");
    setDate("");
    setPhone("");
    setAddress("");
    setCountry("");
    navigate('/home')
  };
  const handleEdit = async () => {
    const docRef = doc(db, "user", takeUid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      try {
        setImg(docSnap.data()?.img);
        setFirstname(docSnap.data()?.firstName);
        setLastName(docSnap.data()?.lastName);
        setDate(docSnap.data()?.email);
        setPhone(docSnap.data()?.phone);
        setAddress(docSnap.data()?.address);
        setCountry(docSnap.data()?.country);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    handleEdit();
    return ()=>{
     
    }
  }, [takeUid]);
  

  const handleDelete = (e:any) => {
    e.preventDefault();
    setData({ img: "" });
    setImg("");
  };
  return (
    <Col lg="9" className="details__user">
      <p className="common__info mb-5 ">UPDATE USER</p>
      <Row>
        <Col lg="8" className="update__user__container">
          {loading ? (
            "loading...."
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Choose File</label>
                <input
                  onChange={(e:any) => setFile(e.target.files[0])}
                  type="file"
                />
              </div>
              <div className="update__main">
                <div className="update__user">
                  <div>
                    <label>FirstName</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstname(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div>
                    <label>LastName</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div>
                    <label>Date</label>
                    <input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      type="date"
                    />
                  </div>
                </div>

                <div className="update__user">
                  <div>
                    <label>Telephone</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div>
                    <label>Address</label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div>
                    <label>Country</label>
                    <input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button disabled={per !== null && per < 100} type="submit">
                  Update
                </button>
              </div>
            </form>
          )}
        </Col>
        <Col lg="4">
          {img ? (
            <div style={{ display: "flex", flexDirection: "column",justifyContent:'center',alignItems:'center' }}>
              <img
                style={{
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 100,
                  marginBottom:10
                }}
                src={file ? URL.createObjectURL(file) : img}
                alt=""
              />
              <button style={{width:100,padding:'5px 10px',textAlign:'center'}} onClick={(e) => handleDelete(e)}>Delete</button>
            </div>
          ) : (
            <>
             {data ? (
                    <div>
                    <img
                      className="aaaa"
                      style={{
                        width: 200,
                        height: 200,
                        objectFit: "cover",
                        borderRadius: 100,
                      }}
                      src={file ? URL.createObjectURL(file) : data?.img}
                      alt=""
                    />
                  </div>
                  ) : (
                    <h6>No image display</h6>
                  )}
            </>
          )}
        </Col>
      </Row>
    </Col>
  );
}

export default UpdateUser;
