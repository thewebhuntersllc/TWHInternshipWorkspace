import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Login from "./pages/login/Login.jsx";
import AddNote from "./pages/addnote/AddNote.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import ViewNote from "./pages/viewnote/ViewNote.jsx";
import EditNote from "./pages/editnote/EditNote.jsx";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword.jsx";
import ChangePassword from "./pages/forgotpassword/ChangePassword.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
       {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      }, {
        path: "/changepassword",
        element: <ChangePassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/addnote",
        element: <AddNote />,
      },  
      {
        path: "/viewnote/:id",
        element: <ViewNote />,
      },  
      {
        path: "/editnote/:id",
        element: <EditNote />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
