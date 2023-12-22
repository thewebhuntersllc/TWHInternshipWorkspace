import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import "./forgotpassword.css";
import { supabase } from "../../backend/CreateClient";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function updatePasswordHandler() {
    const data = await supabase.auth.updateUser({ password });
    if (data) {
      navigate("/");
    }
  }

  return (

    
    <div className="forgot_password_container">
      <Form className="forgot_password_form">
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter your password to update" },
          ]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the new password to update"
          />
        </Form.Item>
        <Form.Item>
          <Button
            onClick={updatePasswordHandler}
            className="loginBtn"
            type="primary"
            htmlType="submit"
          >
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
