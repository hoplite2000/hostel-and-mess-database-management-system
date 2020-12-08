import React, { useState, useEffect } from 'react';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from "../components/messagecomponent";
import Loader from "../components/loadercomponent";
import FormContainer from "../components/formcontainercomponent";
import { addnewmess } from "../actions/messactions";
import { MESS_ADD_RESET } from "../constants/messconstants";

const Addmess = (props) => {

    const [date, setdate] = useState('');
    const [day, setday] = useState('');
    const [rationused, setrationused] = useState(25);
    const [foodwasted, setfoodwasted] = useState(12);

    const dispatch = useDispatch();

    const addmess = useSelector((state) => state.addmess);
    const { loading, error, success, mess } = addmess;

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    useEffect(() => {
        if (!userinfo) {
            props.history.push('/login');
        }
        if (success) {
            dispatch({
                type: MESS_ADD_RESET
            });
            props.history.push('/mess');
        }
    }, [dispatch, props.history, success, userinfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addnewmess({
            date, day, rationused, foodwasted
        }));
        console.log(mess);
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/mess">Mess</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>Add</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to={'/mess'}><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error.statusText ? `Error ${error.status}: ${error.statusText}` : error}</Message> :
                    <FormContainer>
                        <h1>Add Mess Details</h1>
                        <br />
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='date'>
                                <Form.Label>Date</Form.Label>
                                <Form.Control type='date' placeholder='Enter Date' value={date} onChange={(e) => setdate((e.target.value).toString())}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='day'>
                                <Form.Label>Day</Form.Label>
                                <Form.Control as='select' value={day} onChange={(e) => setday(e.target.value)}>
                                    {
                                        ["select", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((d) => {
                                            return <option key={d} value={d}>{d}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='rationused'>
                                <Form.Label>Ration Used</Form.Label>
                                <Form.Control type='number' placeholder='Enter Ration Used' value={rationused} onChange={(e) => setrationused(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='foodwasted'>
                                <Form.Label>Food Wasted</Form.Label>
                                <Form.Control type='number' placeholder='Enter Food Wasted' value={foodwasted} onChange={(e) => setfoodwasted(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary'>Add</Button>
                        </Form>
                    </FormContainer>
            }
        </>
    )
}

export default Addmess;
