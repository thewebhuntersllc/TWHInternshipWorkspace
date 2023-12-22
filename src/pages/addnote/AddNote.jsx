import React, { useEffect, useState } from "react";
import "./addnote.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import Navbar from "../../components/header/Navbar"

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortSummary, setShortSummary] = useState("");
  const navigate = useNavigate();

  function addNoteHandler() {
    console.log(title, description, shortSummary);
    setTitle("");
    setShortSummary("");
    setDescription("");
    
  }

  return (
    <>
    <Navbar/>
    <div className="addnote_container">

      <Form className="addnote_form">
        <h1>Add Your Story</h1>
        <Form.Item>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </Form.Item>
        <Form.Item>
          <Input
            value={shortSummary}
            onChange={(e) => setShortSummary(e.target.value)}
            placeholder="Short Summary of story"
          />
        </Form.Item>
        <Form.Item>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Description"
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={addNoteHandler} type="primary">
            Add Note
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};

export default AddNote;
