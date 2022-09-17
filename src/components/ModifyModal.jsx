import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import AuthUser from './AuthUser';

const ModifyModal = (props) => {
    const [bankUpdateDetails, setBankUpdateDetails] = React.useState({
        bankName: props.bank.bankName,
        bankAddress: props.bank.bankAddress,
        id: props.bank._id
    });

    const token = sessionStorage.getItem('token');
    console.log(token);

    const [isLoading, setIsLoading] = React.useState(false);

    const handleClose = () => {
        props.setShouldShowModal(false);
    }

    const handleChange = (e) => {
        setBankUpdateDetails({
            ...bankUpdateDetails,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("it's working");

        try {
            setIsLoading(true);

            const response = await axios.patch("https://expensemonitoring.herokuapp.com/api/v1/banks/bank/" + bankUpdateDetails.id,
                bankUpdateDetails,
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token.replace(/['"]+/g, '')}`
                    }
                });

            if (response.status === 200) {
                setIsLoading(false);
                props.setShouldShowModal(false);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }

    }

    const handleDelete = async (e) => {

        console.log("it's working");

        try {
            setIsLoading(true);

            const response = await axios.delete("https://expensemonitoring.herokuapp.com/api/v1/banks/bank/" + bankUpdateDetails.id,
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token.replace(/['"]+/g, '')}`
                }
            });

            if (response.status === 200) {
                setIsLoading(false);
                props.setShouldShowModal(false);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }

    }

    const getModifyComponent = () => {
        if (props.action === 'update') {
            return (
                <Form method='post' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter bank" value={bankUpdateDetails.bankName} name= "bankName" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Bank Address</Form.Label>
                        <Form.Control type="text" placeholder="Bank Address" value={bankUpdateDetails.bankAddress} name= "bankAddress" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {isLoading ? 'Updating...' : 'Update'}
                    </Button>
                </Form>
            )
        }
        else if (props.action === 'delete') {
            return (
                <>
                    <p>Are you sure you want to delete this detail?</p>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => handleDelete()}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </>

            )
        }
    }

    const actionTitle = props.action === 'update' ? 'Update your details' : 'Delete your details';

    if (!props.setShouldShowModal) {
        return <></>;
    }
    return (
        <Modal show={props.setShouldShowModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{actionTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{getModifyComponent()}</Modal.Body>
        </Modal>
    )
}

export default ModifyModal