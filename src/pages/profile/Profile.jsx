import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Button, Modal, Input, Row } from "antd";

import "./profile.css";
import { useSelector } from "react-redux";
import { supabase } from "../../backend/CreateClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/header/Navbar";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const { email: savedEmail, user_metadata: savedUserData } = useSelector(
    (state) => state.auth.user
  );
  const navigate = useNavigate();

  const showModal = () => {
    setEmail(savedEmail);
    setFullname(savedUserData.full_name);
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  console.log(savedEmail, savedUserData.full_name);

  const updateProfileHandler = async () => {
    const { data, error } = await supabase.auth.updateUser({
      email,

      data: { fullname },
    });
  };

  const changePasswordHandler = () => {
    navigate("/changepassword");
  };

  return (
    <>
      <Navbar />
      <div className="profile_container">
        <Flex gap={"middle"} className="profile_content">
          <Avatar size={104} icon={<UserOutlined />} />
          <Flex vertical gap={"middle"}>
            <h1>{savedUserData.full_name}</h1>
            <h2>{savedEmail}</h2>
            <Row>
              <Button
                onClick={showModal}
                type="primary"
                className="edit_profile_btn"
              >
                Edit Profile
              </Button>
              <Button onClick={changePasswordHandler} type="primary">
                Change Password
              </Button>
            </Row>
          </Flex>
        </Flex>
        <Modal
          className="update_Modal"
          open={open}
          title="Update Profile"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              {/* <OkBtn  /> */}
            </>
          )}
        >
          <div className="modal_Inputs">
            <Input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Change Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Change Email"
            />
          </div>
          <Button
            className="update_modal_Btn"
            type="primary"
            onClick={updateProfileHandler}
          >
            Update Profile
          </Button>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
