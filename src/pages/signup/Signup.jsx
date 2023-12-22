import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { supabase } from "../../backend/CreateClient";
import "./signup.css";
import { login } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const signupHandler = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullname,
          },
        },
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
          navigate("/signup");
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
          name="fullname"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="FullName"
          />
        </Form.Item>
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
          <Button
            onClick={signupHandler}
            className="signupBtn"
            type="primary"
            htmlType="submit"
          >
            SignUp
          </Button>
        </Form.Item>
        <div className="signup_footer">
          Already a user?
          <Link to={"/login"}> Login Here</Link>
        </div>
        
      </Form>
    </div>
  );
};

export default Signup;
