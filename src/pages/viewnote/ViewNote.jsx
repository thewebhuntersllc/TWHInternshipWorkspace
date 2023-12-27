import React, { useEffect, useState } from "react";
import "./viewnote.css";
import { Button, Drawer, Flex, List } from "antd";
import Navbar from "../../components/header/Navbar";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { supabase } from "../../backend/CreateClient";

const ViewNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // console.log(id);
  async function fetchDataWithSpecificId() {
    const { data, error } = await supabase
      .from("story_creation")
      .select()
      .match({ id });

    // console.log(data);

    if (data) {
      setTitle(data[0].title);
      setDescription(data[0].description);
      setUserFullName(data[0].user_fullname);

      const collaboratorsObj = data[0]?.collaborators
        ? data[0].collaborators.map((collaboratorString) =>
            JSON.parse(collaboratorString)
          )
        : [];
      // console.log("collab obj", collaboratorsObj);

      const uniqueArray = collaboratorsObj.filter((item, index, self) => {
        return (
          index ===
          self.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(item))
        );
      });

      // console.log("uniq arr",uniqueArray);

      setCollaborators(uniqueArray);
      // console.log("collab state", collaborators);
    }
  }

  useEffect(() => {
    fetchDataWithSpecificId();
  }, []);

  useEffect(() => {
    supabase
      .channel(`story_creation:${id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "story_creation" },
        (payload) => {
          console.log("Change received!", payload);
          setTitle(payload.new.title);
          setDescription(payload.new.description);
          setUserFullName(payload.new.user_fullname);
          fetchDataWithSpecificId();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(`story_creation`);
    };
  }, [id]);

  // console.log(data.name);

  return (
    <>
      <Navbar />
      <div className="viewnote_container">
        <h1>{title}</h1>
        <div className="center_content">
          <h4>Created By : {userFullName}</h4>
          <div className="editandDrawerBtn">
            <Link to={`/editnote/${id}`} className="editBtn">
              <EditOutlined />
            </Link>
            <Button type="primary" onClick={showDrawer}>
              Collaborators
            </Button>
          </div>
        </div>
        <p>{description}</p>

        <Drawer
          title="Poeple who edited this story"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <List
            itemLayout="horizontal"
            dataSource={collaborators}
            renderItem={(item, index) => (
              <List.Item> Name: {item.name}</List.Item>
            )}
          />
        </Drawer>
      </div>
    </>
  );
};

export default ViewNote;
