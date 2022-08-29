import React from 'react';
import { Container } from 'reactstrap';
import './common-section.scss';

function CommonSection (props:any) {
  return (
    <div>
      <section className="common__section">
        <Container>
          <h2 className="text-white">{props.title}</h2>
        </Container>
      </section>
    </div>
  );
}

export default CommonSection;
