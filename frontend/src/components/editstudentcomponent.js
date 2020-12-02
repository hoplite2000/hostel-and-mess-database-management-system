import React, { useState, useEffect } from 'react';
import { Form, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from "../components/messagecomponent";
import Loader from "../components/loadercomponent";
import FormContainer from "../components/formcontainercomponent";
import { liststudentdetails, updatestudentdetails } from "../actions/studentactions";
import { STUDENT_UPDATE_RESET } from "../constants/studentconstants";
import axios from 'axios';

const Editstudent = (props) => {
    const studentid = props.match.params.id;

    const [name, setname] = useState('');
    const [usn, setusn] = useState('');
    const [image, setimage] = useState('');
    const [branch, setbranch] = useState('');
    const [year, setyear] = useState(1);
    const [roomno, setroomno] = useState('');
    const [roomatename, setroomatename] = useState('');
    const [roomateusn, setroomateusn] = useState('');
    const [dob, setdob] = useState('');
    const [idproof, setidproof] = useState('');
    const [contact, setcontact] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [feespaid, setfeespaid] = useState(25000);
    const [feesdue, setfeesdue] = useState(0);
    const [penalties, setpenalties] = useState(0);
    const [firstyear, setfirstyear] = useState(2018);
    const [finalyear, setfinalyear] = useState(2022);
    const [bloodgrp, setbloodgrp] = useState('');
    const [ispassedout, setispassedout] = useState(false);
    const [fname, setfname] = useState('');
    const [mname, setmname] = useState('');
    const [paddress, setpaddress] = useState('');
    const [pemail, setpemail] = useState('');
    const [pcontact, setpcontact] = useState('');

    const [uploading, setuploading] = useState(false);

    const dispatch = useDispatch();

    const studentdetails = useSelector((state) => state.studentdetails);
    const { loading, error, student } = studentdetails;

    const updatestudent = useSelector((state) => state.updatestudent);
    const { loading: loadingupdate, error: errorupdate, success: successupdate } = updatestudent;

    useEffect(() => {
        if (successupdate) {
            dispatch({
                type: STUDENT_UPDATE_RESET
            });
            props.history.push('/students');
        } else {
            if (!student.name || student._id !== studentid) {
                dispatch(liststudentdetails(studentid));
            } else {
                setname(student.name);
                setusn(student.usn);
                setimage(student.image);
                setbranch(student.branch);
                setyear(student.year);
                setroomno(student.roomno);
                setroomatename(student.roomatename);
                setroomateusn(student.roomateusn);
                setdob(student.dob);
                setidproof(student.idproof);
                setcontact(student.contact);
                setemail(student.email);
                setaddress(student.address);
                setfeespaid(student.feespaid);
                setfeesdue(student.feesdue);
                setpenalties(student.penalties);
                setfirstyear(student.firstyear);
                setfinalyear(student.finalyear);
                setbloodgrp(student.bloodgrp);
                setispassedout(student.ispassedout);
                setfname(student.parents.fname);
                setmname(student.parents.mname);
                setpaddress(student.parents.address);
                setpemail(student.parents.email);
                setpcontact(student.parents.contact);
            }
        }
    }, [dispatch, studentid, student, props.match, props.history, successupdate]);

    const uploadprofileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setuploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/uploads/profile/student', formData, config);
            setimage(data);
            setuploading(false);
        } catch (error) {
            console.error(error);
            setuploading(false);
        }
    }

    const uploadidentityHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setuploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/uploads/identity/student', formData, config);
            setidproof(data);
            setuploading(false);
        } catch (error) {
            console.error(error);
            setuploading(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatestudentdetails({
            _id: studentid, name, usn, image, branch, year, roomno, roomatename, roomateusn, dob, idproof, contact, email, address, feespaid, feesdue, penalties, firstyear, finalyear, bloodgrp, parents: { fname, mname, address: paddress, email: pemail, contact: pcontact },
        }));
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/students">Students</Link></Breadcrumb.Item>
                <Breadcrumb.Item ><Link to={`/students/${student._id}`}>{student.name}</Link></Breadcrumb.Item>
                <Breadcrumb.Item href="#" active>Edit</Breadcrumb.Item>
            </Breadcrumb>
            <LinkContainer classname='my-3' to={`/students/${student._id}`}><Button variant="dark"><span className="fas fa-chevron-left"></span> Back</Button></LinkContainer>
            {loadingupdate && <Loader />}
            {errorupdate && <Message variant='danger'>{errorupdate.statusText ? `Error ${errorupdate.status}: ${errorupdate.statusText}` : errorupdate}</Message>}
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error.statusText ? `Error ${error.status}: ${error.statusText}` : error}</Message> :
                    <FormContainer>
                        <h1>Edit Student</h1>
                        <br />
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='usn'>
                                <Form.Label>Usn</Form.Label>
                                <Form.Control type='text' placeholder='Enter Usn' value={usn} onChange={(e) => setusn(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter Image' value={image} onChange={(e) => setimage(e.target.value)}></Form.Control>
                                <br />
                                <Form.File id='student-image-file' onChange={uploadprofileHandler} />
                                {uploading && <Loader />}
                            </Form.Group>
                            <Form.Group controlId='branch'>
                                <Form.Label>Branch</Form.Label>
                                <Form.Control as='select' value={branch} onChange={(e) => setbranch(e.target.value)}>
                                    {
                                        ["CSE", "ISE", "ECE", "EEE", "TCE", "ME", "IEM", "AE", "CV"].map((b) => {
                                            return <option key={b} value={b}>{b}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='year'>
                                <Form.Label>Year</Form.Label>
                                <Form.Control as='select' value={year} onChange={(e) => setyear(e.target.value)}>
                                    {
                                        ["1", "2", "3", "4"].map((y) => {
                                            return <option key={y} value={y}>{y}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='roomno'>
                                <Form.Label>Room No</Form.Label>
                                <Form.Control type='text' placeholder='Enter Room No' value={roomno} onChange={(e) => setroomno(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='roomatename'>
                                <Form.Label>Roomate Name</Form.Label>
                                <Form.Control type='text' placeholder='Enter Roomate Name' value={roomatename} onChange={(e) => setroomatename(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='roomateusn'>
                                <Form.Label>Roomate Usn</Form.Label>
                                <Form.Control type='text' placeholder='Enter Roomate Usn' value={roomateusn} onChange={(e) => setroomateusn(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='dob'>
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type='date' placeholder='Enter DOB' value={dob} onChange={(e) => setdob((e.target.value).toString())}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='idproof'>
                                <Form.Label>ID Proof</Form.Label>
                                <Form.Control type='text' placeholder='Enter ID Proof' value={idproof} onChange={(e) => setidproof(e.target.value)}></Form.Control>
                                <br />
                                <Form.File id='student-identity-file' onChange={uploadidentityHandler} />
                                {uploading && <Loader />}
                            </Form.Group>
                            <Form.Group controlId='contact'>
                                <Form.Label>Contact No</Form.Label>
                                <Form.Control type='text' placeholder='Enter Contact No' value={contact} onChange={(e) => setcontact(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='address'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type='text' placeholder='Enter Address' value={address} onChange={(e) => setaddress(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='feespaid'>
                                <Form.Label>Fees Paid</Form.Label>
                                <Form.Control type='number' placeholder='Enter Fees Paid' value={feespaid} onChange={(e) => setfeespaid(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='feesdue'>
                                <Form.Label>Fees Due</Form.Label>
                                <Form.Control type='number' placeholder='Enter Fees Due' value={feesdue} onChange={(e) => setfeesdue(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='penalties'>
                                <Form.Label>Penalties</Form.Label>
                                <Form.Control type='number' placeholder='Enter Penalties' value={penalties} onChange={(e) => setpenalties(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='firstyear'>
                                <Form.Label>First Year</Form.Label>
                                <Form.Control type='number' placeholder='Enter First Year' value={firstyear} onChange={(e) => setfirstyear(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='finalyear'>
                                <Form.Label>Final Year</Form.Label>
                                <Form.Control type='number' placeholder='Enter Final Year' value={finalyear} onChange={(e) => setfinalyear(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='bloodgrp'>
                                <Form.Label>Blood Grp</Form.Label>
                                <Form.Control as='select' value={bloodgrp} onChange={(e) => setbloodgrp(e.target.value)}>
                                    {
                                        ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => {
                                            return <option key={b} value={b}>{b}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='fname'>
                                <Form.Label>Father's Name</Form.Label>
                                <Form.Control type='text' placeholder="Enter Father's Name" value={fname} onChange={(e) => setfname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='mname'>
                                <Form.Label>Mother's Name</Form.Label>
                                <Form.Control type='text' placeholder="Enter Mother's Name" value={mname} onChange={(e) => setmname(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='paddress'>
                                <Form.Label>Parent's Address</Form.Label>
                                <Form.Control type='text' placeholder="Enter Parents's Address" value={paddress} onChange={(e) => setpaddress(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='pemail'>
                                <Form.Label>Parents' Email</Form.Label>
                                <Form.Control type='email' placeholder="Enter Parent's Email" value={pemail} onChange={(e) => setpemail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='pcontact'>
                                <Form.Label>Parent's Contact</Form.Label>
                                <Form.Control type='text' placeholder="Enter Parent's Contact" value={pcontact} onChange={(e) => setpcontact(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='ispassedout'>
                                <Form.Check type='checkbox' label='Passed Out' checked={ispassedout} onChange={(e) => setispassedout(e.target.checked)}></Form.Check>
                            </Form.Group>
                            <Button type='submit' variant='primary'>Update</Button>
                        </Form>
                    </FormContainer>
            }
        </>
    )
}

export default Editstudent;
