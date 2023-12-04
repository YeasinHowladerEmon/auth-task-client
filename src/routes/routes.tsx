import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home/Home";
import SignUp from "../components/Home/SignUp";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
        ]
    },


])

export default routes;