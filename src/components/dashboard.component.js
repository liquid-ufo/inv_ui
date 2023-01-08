import React from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            {/* <h1>dashboard</h1>
    */}

            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <Link to="/invoice">Invoice</Link>
                &nbsp;|&nbsp;
                <Link to="/users">Bot users</Link>




            </nav>
        </div>

    )
}

export default Dashboard;