import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios"

import "bootstrap/dist/css/bootstrap.min.css";

export default function FormModal(props){

    const [refresh, setRefresh]  = React.useState(false);
    const [dataUpdated, setDataUpdated]  = React.useState(false);
    const [dataError, setDataError]  = React.useState(false);
    const [showModal, setShowModal] = React.useState( props.showModal);
    
    //alert("FormModal ShowModal::" + showModal);
    //alert("props.showModal: " + props.showModal);
    const [formData, setFormData] = React.useState({
        email: "",
        profession: "defaultValue",
        suggestion: ""
    });
    const [ errors, setErrors ] = React.useState({});

    const handleChange = (e) =>{
        e && e.preventDefault();
        //const {email, profession, suggestion} = e.target;
        setFormData({
          ...formData,
          [e.target.id]: e.target.value
        });
      }
    
    const handleClose = (e) => {
        e && e.preventDefault();
        setShowModal(false);
        setRefresh(!refresh);
    };
    const findFormErrors = () => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const { email, profession, suggestion } = formData;
        const newErrors = {};
        // email errors
        if ( !email || email === '' ) newErrors.email = 'Please provide your email for further communication!'
        else if  (!email.match(validRegex))  newErrors.email = 'Email format does not look right!'
        // profession errors
        if ( !profession || profession === '' || profession === 'defaultValue') 
            newErrors.profession = 'Your profession will help us serve you better!'
        // suggestion errors
        if ( !suggestion || suggestion === '' ) newErrors.suggestion = 'Please share your valuable suggestion!'
    
        return newErrors
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        //alert(JSON.stringify(formData));

        const newErrors = findFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors);
        }
        else{
            axios({
            
                // Endpoint to send files
                url: "https://iz4tu2qmv5.execute-api.us-east-2.amazonaws.com/Test/users",
                method: "POST",
                //headers: {

                    // Add any auth token here
                //  authorization: "your token comes here",
                //},
                data: formData})
                .then((res) => { 
                    setDataUpdated(true);
                })
                .catch((err) => { 
                    setDataError(true);
                });
                //showModal.current = false;
                //setRefresh(!refresh);
        }
    }

    return (
        <>
            <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered>
                <Modal.Header closeButton>
                <Modal.Title>Share your suggestions or comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div> {props && props.text && props.text} </div><br/>
                {!dataUpdated && !dataError && 
                <Form>
                    <Form.Group className="mb-3" controlId="formData.email">
                        <Form.Label>Email address*</Form.Label>
                        <Form.Control
                        id= "email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoFocus
                        required
                        isInvalid={ !!errors.email }
                        />
                    <Form.Control.Feedback type='invalid'>
                        { errors.email }
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formData.profession">
                        <Form.Label>Profession*</Form.Label>
                        <Form.Control as='select' 
                        id="profession" 
                        value={formData.profession} 
                        onChange={handleChange}
                        isInvalid={ !!errors.profession }>
                            <option value='defaultValue'>--Select your profession--</option>
                            <option value='College professor'>College professor</option>
                            <option value='School teacher'>School teacher</option>
                            <option value='K12 student'>K12 student</option>
                            <option value='College student'>College student</option>
                            <option value='Graduate student'>Graduate student</option>
                            <option value='PHD student'>PHD student</option>
                            <option value='MBA student'>MBA student</option>
                            <option value='Engineering student'>Engineering student</option>
                            <option value='Business owner'>Business owner</option>
                            <option value='Entrepreneur'>Entrepreneur</option>
                            <option value='Scientist'>Scientist</option>
                            <option value='Other'>Other</option>
                        </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        { errors.profession }
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formData.suggestion">
                        <Form.Label>Suggestions/comments*</Form.Label>
                        <Form.Control id="suggestion" as="textarea" rows={3} cols={10}
                        value={formData.suggestion}
                        onChange={handleChange}
                        required
                        isInvalid={ !!errors.suggestion }
                        />
                    <Form.Control.Feedback type='invalid'>
                        { errors.suggestion }
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form>}
                {dataUpdated && 
                    <div className="successMessage">
                        Your suggestion or comment has been received by Zebra team. Zebra is currently committed to building 
                        this website with more relevant contents. We shall get back at the earliest.    
                    </div>
                }
                {dataError && 
                    <div className="errorMessage">
                        Your suggestion or comment could not be received by Zebra team because of high volume of requests. Zebra is currently committed to building 
                        this website with more relevant contents. We shall get back at the earliest.    
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant={(!dataUpdated && !dataError)? "secondary" : "primary"} onClick={handleClose}>
                Close
                </Button>
                {!dataUpdated && !dataError && <Button variant="primary" onClick={handleSubmit}>Submit</Button>}
            </Modal.Footer>
            </Modal>
        </>
    );
    
        
}





