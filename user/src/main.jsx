import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.scss'
import './assets/normalize.css'
import Login from './views/Login/Login.jsx';
import Register from './views/Register/Register.jsx';
import HomePage from './views/HomePage/HomePage.jsx';
import MyInfomation from './views/MyInfomation/MyInfomation.jsx';
import Notification from './views/Notification/Notification.jsx';
import Wrapper from './views/Wrapper';
import SendParcel from './views/SendParcel/SendParcel.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/homepage",
    element: <HomePage />
  },
  {
    path: "/sendparcel",
    element: <SendParcel />
  },
  {
    path: "/layout",
    element: <Wrapper />,
    children: [
      {
        path: "my",
        element: <MyInfomation />
      },
      {
        path: "notification",
        element: <Notification />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
