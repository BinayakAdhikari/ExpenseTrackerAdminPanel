import { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import React, { Component } from 'react';

export default function Dashboard() {
    const { http } = AuthUser();
    const [bankdetails, setUserdetail] = useState('');
    const [keyworddetails, setKeywordDetail] = useState('');

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

    function renderElement() {
        if (bankdetails && keyworddetails) {
            return <div className="container">
                <h3 className="p-3 text-center">List of Banks</h3>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Bank Name</th>
                            <th>Bank Address</th>
                            <th>Added On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bankdetails && bankdetails.map(bank =>
                            <tr key={bank._id}>
                                <td>{bank.bankName}</td>
                                <td>{bank.bankAddress}</td>
                                <td>{bank.addedOn}</td>
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
                        </tr>
                    </thead>
                    <tbody>
                        {keyworddetails && keyworddetails.map(keyword =>
                            <tr key={keyword._id}>
                                <td>{keyword.keywordName}</td>
                                <td>{keyword.addedBy.username}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
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