import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Typography } from '@mui/material';

function CheckSuccess () {
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
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CheckSuccess;
