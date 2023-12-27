import { useNavigate, Outlet } from "react-router-dom";
import "./App.css";

import { supabase } from "./backend/CreateClient";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // console.log(user);

    // console.log(user.email, user.id, user.user_metadata.full_name);

    if (user) {
      dispatch(login({ user }));
    } else {
      dispatch(logout());
      navigate("/login");
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  // console.log(user)

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
