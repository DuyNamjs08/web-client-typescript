import React from "react";
import { useState, useEffect } from "react";
import ModalConfirm from "../../components/UI/modal-confirm/ModalConfirm";
import { useSelector } from "react-redux";
import { db, auth } from "../../firebase/firebase-Config";
import {
  doc,
  // addDoc , collection ,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";


function CheckOut() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [typeofCard, setTypeofCard] = useState("");
  const [nameOncard, setNameOncard] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [CVV, setCVV] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [payment, setPayment] = useState("creditCard");
  const cartAr = useSelector((state:any) => state.ReducerCheckout.cartAr);
  const totalAmount = useSelector((state:any) => state.ReducerCheckout.totalAmount);
  const totalQuantity = useSelector(
    (state:any) => state.ReducerCheckout.totalQuantity
  );
  const confirm ='not confirm'
  



  const data = {
    firstName,
    lastName,
    email,
    address,
    telephone,
    country,
    state,
    zip,
    typeofCard,
    nameOncard,
    creditCardNumber,
    expiration,
    CVV,
    payment,
    confirm:confirm,
  };

  // const currentUser = useSelector((state) => state.ReducerCheckout.currentUser);

  const authCheckOut = async () => {
    await addDoc(collection(db, "orders"), {
      ...data,
      cartAr: cartAr,
      currTime: new Date(),
    });
    cartAr.map(async (item:any) => {
      await updateDoc(doc(db, "product", item.id), {
        stock: Number(item.stock) - Number(item.quantity),
      });
    });
  };
  console.log("cartAr :", cartAr);

  const handleModalOpen = async () => {
    setModalOpen(true);
  };
  const handleSubmit = (e:any) => {
    e.preventDefault();
    handleModalOpen();
  };
  auth.currentUser && console.log("idUser:", auth.currentUser.uid);
  useEffect(() => {
    
    window.scroll(0, 0);
  }, []);
  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Checkout form</h2>
          <p className="lead">Below is an example form built entirely</p>
        </div>
        {/* ==== */}
        <div className="row g-5">
          <div className="col-md-6 col-lg-5 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
                {totalQuantity}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {cartAr.length > 0 ? (
                cartAr.map((item:any) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between lh-sm"
                  >
                    <div>
                      <h6 className="my-0">{item.title}</h6>
                      <small className="text-muted">Brief description</small>
                    </div>
                    <span className="text-muted">{item.price}</span>
                  </li>
                ))
              ) : (
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Your cart is empty</h6>
                  </div>
                  <span className="text-muted">0</span>
                </li>
              )}

              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span className="text-success">$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${totalAmount}</strong>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </form>
          </div>
          {/* ===== */}
          <div className="col-md-6 col-lg-7">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    value={firstName}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                {/* +++++ */}
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    onChange={(e) => setlastName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    value={lastName}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
                {/* ++++++ */}

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
                {/* +++++++++ */}
                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                    value={address}
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
                {/* +++++++++ */}
                <div className="col-12">
                  <label htmlFor="telephone" className="form-label">
                    Telephone
                  </label>
                  <input
                    onChange={(e) => setTelephone(e.target.value)}
                    type="number"
                    className="form-control"
                    id="telephone"
                    placeholder="Apartment or suite"
                    value={telephone}
                  />
                </div>
                {/* +++++++++ */}
                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    className="form-select"
                    id="country"
                    required
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  >
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                {/* +++++++++ */}
                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select
                    className="form-select"
                    id="state"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                {/* +++++++++ */}
                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    value={zip}
                    placeholder=""
                    required
                    onChange={(e) => setZip(e.target.value)}
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
                {/* +++++++++ */}
              </div>

              <hr className="my-4"></hr>
              {/* ========== */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>
              {/* ============ */}
              <hr className="my-4"></hr>
              <h4 className="mb-3">Payment</h4>
              <h2
                onClick={() => setPayment("creditCard")}
                className="btn btn-primary btn-md me-3"
              >
                Credit card
              </h2>
              <h2
                onClick={() => setPayment("cash")}
                className="btn btn-primary btn-md "
              >
                Cash
              </h2>

              {payment === "creditCard" ? (
                <div>
                  <div className="my-3">
                    <div className="form-check">
                      <input
                        id="debit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        required
                        onChange={(e) => setTypeofCard(e.target.value)}
                        value="Master-card"
                      />
                      <label className="form-check-label" htmlFor="debit">
                        Master card
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        required
                        onChange={(e) => setTypeofCard(e.target.value)}
                        value="momo"
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        Momo
                      </label>
                    </div>
                  </div>
                  {/* ======= */}
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <label htmlFor="cc-name" className="form-label">
                        Name on card
                      </label>
                      <input
                        onChange={(e) => setNameOncard(e.target.value)}
                        type="text"
                        className="form-control"
                        id="nameOncard"
                        placeholder=""
                        required
                        value={nameOncard}
                      />
                      <small className="text-muted">
                        Full name as displayed on card
                      </small>
                      <div className="invalid-feedback">
                        Name on card is required
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="cc-number" className="form-label">
                        Credit card number
                      </label>
                      <input
                        onChange={(e) => setCreditCardNumber(e.target.value)}
                        type="text"
                        className="form-control"
                        id="creditCardNumber"
                        placeholder=""
                        required
                        value={creditCardNumber}
                      />
                      <div className="invalid-feedback">
                        Credit card number is required
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="cc-expiration" className="form-label">
                        Expiration
                      </label>
                      <input
                        onChange={(e) => setExpiration(e.target.value)}
                        type="date"
                        className="form-control"
                        id="expiration"
                        value={expiration}
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Expiration date required
                      </div>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="cc-cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        onChange={(e) => setCVV(e.target.value)}
                        type="text"
                        className="form-control"
                        id="CVV"
                        value={CVV}
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Security code required
                      </div>
                    </div>
                  </div>
                  {/* =============== */}
                </div>
              ) : (
                <div></div>
              )}
              {/* ============== */}

              <hr className="my-4"></hr>
              <button type="submit" className="w-70 btn btn-primary btn-lg">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* ====footer ===== */}
      <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">&copy; 2017-2021 Company Name</p>
      </footer>
      {modalOpen && (
        <ModalConfirm authCheckOut={authCheckOut} setOpenModal={setModalOpen} />
      )}
    </div>
  );
}

export default CheckOut;
