import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import { listrooms } from '../actions/roomactions';
import Room from '../components/roomcomponent';
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';

const Rooms = () => {

    const dispatch = useDispatch();

    const roomlist = useSelector((state) => state.roomlist);
    const {loading, error, rooms} = roomlist; 

    useEffect(() => {
        dispatch(listrooms());
    }, [dispatch]);

    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="#" active>Rooms</Breadcrumb.Item>
            </Breadcrumb>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{`Error ${error.status}: ${error.statusText}`}</Message> :
                <Row>
                    {rooms.map((room) => (
                        <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
                            <Room room={room} />
                        </Col>
                    ))}
                </Row>
            }
        </>
    );
}

export default Rooms;