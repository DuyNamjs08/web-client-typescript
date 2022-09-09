import React from 'react';
import {Container , Row , Col} from 'reactstrap'
import { Link } from 'react-router-dom';
function TitleLink(props:any) {
    const {idProduct} = props
    return (
        <Container >
            <Row>
                <Col lg='12' className='mt-4'>
                    <h4>
                    <Link to='/home'>Home</Link> / <Link to='/product'>All Product </Link> /{idProduct}
                    </h4>
                </Col>
            </Row>
        </Container>
    );
}

export default TitleLink;