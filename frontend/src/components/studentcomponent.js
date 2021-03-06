import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deletestudentdetails } from "../actions/studentactions";

const Student = (props) => {
    var variant = '';
    if (props.student.ispassedout) {
        variant = 'danger';
    }
    const dispatch = useDispatch();

    const userlogin = useSelector((state) => state.userlogin);
    const { userinfo } = userlogin;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deletestudentdetails(id));
        }
    }

    return (
        <Card style={{ height: "375px" }} className="p-3 my-3 rounded" border={variant}>
            <Link to={`/students/${props.student._id}`}>
                <Card.Img src={props.student.image} style={{ height: "125px", width: "220px" }} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/students/${props.student._id}`}>
                    <Card.Title as="div">
                        <h3><strong>{props.student.name}</strong></h3>
                    </Card.Title>
                </Link>
                <Card.Text>
                    <ul className="card-text">
                        <li>USN: {props.student.usn}</li>
                        <li>Room No.: {props.student.roomno}</li>
                        <li>Contact: {props.student.contact}</li>
                        <li>Branch: {props.student.branch}</li>
                        <li>Year: {props.student.year}</li>
                    </ul>
                </Card.Text>
                {userinfo && userinfo.isadmin && (
                    <div className="bottom-right">
                        <LinkContainer to={`/students/${props.student._id}/edit`}><Button variant='success'><span className="fas fa-edit"></span></Button></LinkContainer>{' '}
                        <Button variant='danger' onClick={() => deleteHandler(props.student._id)}><span className="fas fa-trash-alt"></span></Button>
                    </div>
                )}
            </Card.Body >
        </Card >
    );
}

export default Student;