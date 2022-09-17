import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const ModifyKeywordModal = (props) => {
    const [keywordUpdateDetails, setKeywordUpdateDetails] = React.useState({
        keywordName: props.keyword.keywordName,
        id: props.keyword._id
    });

    const token = sessionStorage.getItem('token');
    console.log(token);

    const [isLoading, setIsLoading] = React.useState(false);

    const handleClose = () => {
        props.setShouldShowKeywordModal(false);
    }

    const handleChange = (e) => {
        setKeywordUpdateDetails({
            ...keywordUpdateDetails,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("it's working");

        try {
            setIsLoading(true);

            const response = await axios.patch("https://expensemonitoring.herokuapp.com/api/v1/keywords/keyword/" + keywordUpdateDetails.id,
                keywordUpdateDetails,
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token.replace(/['"]+/g, '')}`
                    }
                });

            if (response.status === 200) {
                setIsLoading(false);
                props.setShouldShowKeywordModal(false);
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

            const response = await axios.delete("https://expensemonitoring.herokuapp.com/api/v1/keywords/keyword/" + keywordUpdateDetails.id,
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token.replace(/['"]+/g, '')}`
                    }
                });

            if (response.status === 200) {
                setIsLoading(false);
                props.setShouldShowKeywordModal(false);
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
                        <Form.Label>Keyword Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter keyword" value={keywordUpdateDetails.keywordName} name="keywordName" onChange={handleChange} />
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

    if (!props.shouldShowKeywordModal) {
        return <></>;
    }
    return (
        <Modal show={props.shouldShowKeywordModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{actionTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{getModifyComponent()}</Modal.Body>
        </Modal>
    )
}

export default ModifyKeywordModal