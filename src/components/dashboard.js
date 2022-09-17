import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import React, { Component } from 'react';
import ModifyModal from './ModifyModal';
import ModifyKeywordModal from './ModifyKeywordModal';

export default function Dashboard() {
    const { http } = AuthUser();
    const [bankdetails, setUserdetail] = useState('');
    const [keyworddetails, setKeywordDetail] = useState('');
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedKeyword, setSelectedKeyword] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [shouldShowKeywordModal, setShouldShowKeywordModal] = useState(false);

    useEffect(() => {
        fetchBankDetail();
        fetchKeywordDetail();
    }, []);

    const fetchBankDetail = () => {
        http.get('/banks').then((res) => {
            console.log(res.data);
            setUserdetail(res.data.data);
        });
    }

    const fetchKeywordDetail = () => {
        http.get('/keywords').then((res) => {
            console.log(res.data);
            setKeywordDetail(res.data.data);
        });
    }

    const handleClick = (bank, action) => {
        setSelectedBank({...bank});
        setSelectedAction(action);
        setShouldShowModal(true);
    }

    const handleKeywordClick = (keyword, action) => {
        setSelectedKeyword({...keyword});
        setSelectedAction(action);
        setShouldShowKeywordModal(true);
    }

    function renderElement() {
        if (bankdetails && keyworddetails) {
            return <>
            <div className="container">
                <h3 className="p-3 text-center">List of Banks</h3>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Bank Name</th>
                            <th>Bank Address</th>
                            <th>Added On</th>
                            <th colSpan={2}>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bankdetails && bankdetails.map(bank =>
                            <tr key={bank._id}>
                                <td>{bank.bankName}</td>
                                <td>{bank.bankAddress}</td>
                                <td>{bank.addedOn}</td>
                                <td><button type='button' name='Update' onClick={() => handleClick(bank, 'update')}>Update</button></td>
                                <td><button type='button' name='Delete' onClick={() => handleClick(bank, 'delete')}>Delete</button></td>
                            </tr>

                        )}
                    </tbody>
                </table>
                <h3 className="p-3 text-center">List of Keywords</h3>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Keywords</th>
                            <th>Added By</th>
                            <th colSpan={2}>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {keyworddetails && keyworddetails.map(keyword =>
                            <tr key={keyword._id}>
                                <td>{keyword.keywordName}</td>
                                <td>{keyword.addedBy.username}</td>
                                <td><button type='button' name='Update' onClick={() => handleKeywordClick(keyword, 'update')}>Update</button></td>
                                <td><button type='button' name='Delete' onClick={() => handleKeywordClick(keyword, 'delete')}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {shouldShowModal && <ModifyModal bank={selectedBank} action={selectedAction} setShouldShowModal = {setShouldShowModal} shouldShowModal = {shouldShowModal}/>}
            {shouldShowKeywordModal && <ModifyKeywordModal keyword={selectedKeyword} action={selectedAction} setShouldShowKeywordModal = {setShouldShowKeywordModal} shouldShowKeywordModal = {shouldShowKeywordModal}/>}
            </>
        } else {
            return <p>Loading.....</p>
        }

    }

    return (
        <div>
            <h1 className='mb-4 mt-4'>Dashboard page</h1>
            {renderElement()}
        </div>
    )
}