import React, { useEffect, useState } from 'react';
import * as CONSTANTS from "../constants";
import { Link } from "react-router-dom";

function Users() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        // console.log("userData", userData);

        const url = CONSTANTS.API_BASE_URL + "/api/testpdf/getUpdates";
        setInterval(() => {

            fetch(url, {
                method: "GET",
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(data => data.json())
                .then(data => {
                    console.log("data:", data);
                    if (data && typeof data === "object") {
                        const parsedData = [];
                        Object.keys(data).forEach(key => {
                            const obj = {};
                            obj.chatId = key;
                            obj.name = data[key];
                            parsedData.push(obj)
                        });
                        setUserData(parsedData);
                    }
                }).catch(error => {
                    console.log("error:", error);
                });
        }, 10000);

    }, []);



    return (
        <div className="container">

            <div className="container-fluid">
                <Link to="/">Home</Link>
                &nbsp;|&nbsp;
                <Link to="/invoice">Invoice</Link>
                <br />

                <h1 className="h3 mb-2 text-gray-800">{CONSTANTS.BOT_NAME}</h1>
                <p className="mb-4">Send a message to <strong>{CONSTANTS.BOT_NAME}</strong> on telegram</p>

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Active users</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Chat ID</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {userData.map(x =>
                                        <tr key={x.id}>
                                            <td key={x.id}>{x.chatId}</td>
                                            <td key={x.id}>{x.name}</td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Users;