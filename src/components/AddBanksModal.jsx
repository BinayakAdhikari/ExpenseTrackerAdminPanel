import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const AddBanksModal = (props) => {
    const user = sessionStorage.getItem('user');

    const [addBanksDetails, setAddBankDetails] = React.useState({
        bankName: '',
        bankAddress: '',
        addedBy: JSON.parse(user)._id,
    });

    const [addKeywordDetails, setAddKeywordDetails] = React.useState({
        keywordName: '',
        addedBy: JSON.parse(user)._id,
    });

    const token = sessionStorage.getItem('token');
    console.log(token);

    const [isLoading, setIsLoading] = React.useState(false);

    const handleClose = () => {
        props.setShouldShowAddBankModal(false);
    }

    const handleChange = (e) => {

        if (props.action === 'addBank') {
            setAddBankDetails({
                ...addBanksDetails,
                [e.target.name]: e.target.value
            });

        } else {
            setAddKeywordDetails({
                ...addKeywordDetails,
                [e.target.name]: e.target.value
            });
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("it's working");

        try {
            setIsLoading(true);

            if (props.action === 'addBank') {
                const response = await axios.post("https://expensemonitoring.herokuapp.com/api/v1/banks",
                    addBanksDetails,
                    {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token.replace(/['"]+/g, '')}`
                        }
                    });


                if (response.status === 201) {
                    setIsLoading(false);
                    props.setShouldShowAddBankModal(false);
                    window.location.reload();
                }
            } else {
                const response = await axios.post("https://expensemonitoring.herokuapp.com/api/v1/keywords",
                    addKeywordDetails,
                    {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token.replace(/['"]+/g, '')}`
                        }
                    });


                if (response.status === 201) {
                    setIsLoading(false);
                    props.setShouldShowAddBankModal(false);
                    window.location.reload();
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }

    }

    const getAddComponent = () => {
        if (props.action === 'addBank') {
            return (
                <Form method='post' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter bank" value={addBanksDetails.bankName} name="bankName" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Bank Address</Form.Label>
                        <Form.Control type="text" placeholder="Bank Address" value={addBanksDetails.bankAddress} name="bankAddress" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {isLoading ? 'Adding...' : 'Add'}
                    </Button>
                </Form>
            )
        }

        if (props.action === 'addKeyword') {
            return (
                <Form method='post' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Keyword Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter kwyword" value={addKeywordDetails.keywordName} name="keywordName" onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {isLoading ? 'Adding...' : 'Add'}
                    </Button>
                </Form>
            )
        }
    }

    const actionTitle = 'Add new details';

    if (!props.shouldShowAddBankModal) {
        return <></>;
    }
    return (
        <Modal show={props.shouldShowAddBankModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{actionTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{getAddComponent()}</Modal.Body>
        </Modal>
    )
}

export default AddBanksModal