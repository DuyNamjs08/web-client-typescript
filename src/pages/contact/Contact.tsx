import React, { useEffect,useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import './contact.scss';
import img from '../../assets/images/feedback.png';
import { useSelector } from 'react-redux';
import { collection, addDoc } from "firebase/firestore"; 
import {db} from '../../firebase/firebase-Config' 
import { ToastContainer, toast } from 'react-toastify';


function Contact() {
  const takeUid = useSelector((state:any) => state.ReducerCheckout.takeUid);
  const [name,setName]=useState("")
  const [text,setText]=useState("")

  const handleSubmit=async(e:any)=>{
    e.preventDefault()
    await addDoc(collection(db, "feedback"), {
      idUser:takeUid,
      name,text
    });
    toast.success("Send feedbck sucsses");
    setName('')
    setText('')
  }
  useEffect(() => {
    window.scroll(0, 0);
  },[]);
  return (
    <section className="pt-0">
      <Container className="contact__container">
        <Row>
          <Col lg="12">
            <ul>
              <li>About Chill Shop</li>
              <li>History</li>
              <li>Activation</li>
              <li>Recruiment</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="contact__text">
            <h3>About Chill Shop</h3>
            <p>
              Through more than 39 years of production and business activities with many ups and
              downs and challenges, now, Chill Shop has grown and developed with the country,
              becoming a prestigious, reliable and familiar brand with consumers. It is the pride of
              Vietnamese people about a National Brand in the field of prestigious and quality
              Footwear.
            </p>
            <h6>Feet Dont Get Tired</h6>
            <p>
              From a small production base started in 1982 and became a cooperative named Binh Tien
              specializing in the production of Rubber sandals in District 6 with a few dozen
              workers and above all a heart for the economic development of the country. With
              dedicated owners, has experienced the period of the subsidized economy with many
              difficulties. However, more than 33 years have passed, like a tireless footstep, Binh
              Tien Consumer Goods Production Co., Ltd has gradually built for itself a production
              and export strategy of the times. , creating a Footwear brand associated with consumer
              needs and tastes. Currently, company has become a strong unit, demonstrating a
              breakthrough in the field of footwear production and business; have enough human,
              material and financial resources to develop the profession and bring about higher
              results.
            </p>
          </Col>
        </Row>
        <Row className="feedback__contact">
          <Col lg="4">
            <h4 style={{marginBottom:20}}>Give us Feedback</h4>
            <img className="w-100" src={img} alt="" />
          </Col>
          <Col lg="8">
            <form onSubmit={handleSubmit}>
              <div className="feedback__item">
                <label htmlFor="">User Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" />
              </div>
              <div className="feedback__item">
                <label>Feedback of you</label>
                <textarea value={text} onChange={(e)=>setText(e.target.value)} />
              </div>
             <div className='btn__contact'>
             <button type='submit'>Submit</button>
             </div>
            </form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  );
}

export default Contact;
