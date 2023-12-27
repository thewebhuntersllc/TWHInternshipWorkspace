import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";

import "./login.css";
import { supabase } from "../../backend/CreateClient";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const loginHandler = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (data) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log(user);

        // console.log(user.email, user.id, user.user_metadata.full_name);

        if (user) {
          dispatch(login({ user }));
          navigate("/");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Form className="form">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </Form.Item>
        <Form.Item>
        <div className="forgot_password">
          
          <Link to={"/forgotpassword"}>Forgot Password?</Link>
        </div>
          <Button
            onClick={loginHandler}
            className="loginBtn"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
       
        <div className="login_footer">
          Don't have an account?
          <Link to={"/signup"}> Signup Here</Link>
        </div>
       
      </Form>
    </div>
  );
};

export default Login;
