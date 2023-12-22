import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import "./forgotpassword.css"
import { supabase } from '../../backend/CreateClient';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    async function forgotPasswordHandler() {
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/changepassword',
          })
          
    }


  return (
    <div className="forgot_password_container">
    <Form className="forgot_password_form">
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter recovery email address"
        />
      </Form.Item>
      <Form.Item>
       
          <Button
            onClick={forgotPasswordHandler}
            className="loginBtn"
            type="primary"
            htmlType="submit"
          >
            Send Reset Password Link
          </Button>
        </Form.Item>
      </Form>
      </div>
  )
}

export default ForgotPassword