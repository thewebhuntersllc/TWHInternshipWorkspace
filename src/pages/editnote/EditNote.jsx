import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./editnote.css";
import Navbar from "../../components/header/Navbar";
import { supabase } from "../../backend/CreateClient";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [collaborators, setCollaborators] = useState([]);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const user_id = user.id;
  const loggedInUserFullName = user.user_metadata.full_name;
  const { id } = useParams();

  async function fetchDataWithSpecificId() {
    const { data, error } = await supabase
      .from("story_creation")
      .select()
      .match({ id });

    // console.log(data);
    // const userId = data[0].user_id;
    if (data) {
      setTitle(data[0].title);
      setDescription(data[0].description);
      setSummary(data[0].summary);
      setUserFullName(data[0].user_fullname);
      const collaboratorsArray = data[0]?.collaborators
        ? data[0].collaborators.map((collaboratorString) =>
            JSON.parse(collaboratorString)
          )
        : [];

      // console.log(collaboratorsArray);
      setCollaborators(collaboratorsArray);
    }
  }

  useEffect(() => {
    fetchDataWithSpecificId();
  }, []);

  async function editNoteHandler() {
    // console.log(title, description, setSummary);

    const { data, error } = await supabase
      .from("story_creation")
      .update({
        title,
        description,
        summary,
        user_id,
        user_fullname: userFullName,
        collaborators: [
          ...collaborators,
          JSON.stringify({ name: loggedInUserFullName }),
        ],
      })
      .eq("id", id)
      .select();
    if (data) {
      console.log("returned data after updating", data);
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
          <h1>Edit Your Story</h1>
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
            <Button onClick={editNoteHandler} type="primary">
              Save Note
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditNote;
