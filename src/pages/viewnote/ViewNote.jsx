import React from "react";
import "./viewnote.css";
import { Flex } from "antd";
import Navbar from "../../components/header/Navbar";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ViewNote = () => {
  return (
    <>
    <Navbar/>
    <div className="viewnote_container">
      <h1>Title</h1>
      <div className="center_content">


      <h4>Created By : FullName</h4>
      <Link to={"/editnote/123"} className="editBtn">
      
      <EditOutlined />
      </Link>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem
        iste odit delectus excepturi blanditiis voluptate, obcaecati enim?
        Suscipit autem doloribus assumenda id numquam quia quos perferendis ea,
        beatae fuga voluptatem ad quaerat natus distinctio!
      </p>
    </div>
    </>
  );
};

export default ViewNote;
