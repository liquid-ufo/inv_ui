import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Dashboard from "../components/dashboard.component";
import Invoice from "../components/invoice.component";
import Users from "../components/users.component";

const loader = () => {
    return <span>Loading...</span>
};

const router = createBrowserRouter([
    {
        path: "/",
        loader: loader,
        element: <Dashboard />,
    },
    {
        path: "/invoice",
        loader: loader,
        element: <Invoice />,
    },
    {
        path: "/users",
        loader: loader,
        element: <Users />,
    },
]);

export default router;