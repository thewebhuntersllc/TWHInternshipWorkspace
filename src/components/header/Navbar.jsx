import React from "react";
import { Menu, Dropdown, Button, Layout } from "antd";
import { Link } from "react-router-dom";
import { supabase } from "../../backend/CreateClient";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const { Header, Content } = Layout;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(
    (state) => state.auth.user
  );
  // console.log(user);

  async function logoutHandler() {
    const { error } = await supabase.auth.signOut();
    dispatch(logout());
    navigate("/login");
  }

  const items = [
    {
      key: "1",
      label: <Link to={"/profile"}>Profile</Link>,
    },
    {
      key: "2",
      label: (
        <Button type="text" onClick={logoutHandler}>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Header className="header">
        <Link to={"/"} className="link_tag">
          Home
        </Link>
        <div className="rigt_content_navbar">
          <Link to={"/addnote"} className="link_tag">
            AddNote
          </Link>

          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
          >
            <Button>{user?.user_metadata?.full_name}</Button>
          </Dropdown>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
