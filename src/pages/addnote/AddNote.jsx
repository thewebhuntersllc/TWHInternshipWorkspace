import React, { useEffect, useState } from "react";
import "./addnote.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import Navbar from "../../components/header/Navbar";
import { supabase } from "../../backend/CreateClient.js";
import { useSelector } from "react-redux";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const user_id = user.id;
  const user_fullname = user.user_metadata.full_name;
  // console.log("user id", user.id);
  // console.log("user fullname", user.user_metadata.full_name);

  async function addNoteHandler() {
    const { data, error } = await supabase
      .from("story_creation")
      .upsert({ title, description, summary, user_id, user_fullname })
      .select();

    // console.log("error", error);
    // console.log("resturned data after inserting",data);
    // console.log("returned story id", data[0].id);
    if (data) {
      navigate(`/viewnote/${data[0].id}`);
    }
    setTitle("");
    setSummary("");
    setDescription("");
  }

  return (
    <>
      <Navbar />
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
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
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
