import React,{useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

function CheckSuccess () {
  const takeUid = useSelector((state:any) => state.ReducerCheckout.takeUid);
  const currentUser = useSelector((state:any) => state.ReducerCheckout.currentUser);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12' >
            <React.Fragment>
              <Typography variant="h5" gutterBottom align="center">
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1" align="center" >
                ID {takeUid}---Email {currentUser} had ordered .Please waite in minute we 
                have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              <Typography variant="subtitle1" align="center" >
                <Link to='/profile'> See Detail Yours Order</Link>
              </Typography>
            </React.Fragment>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CheckSuccess;
