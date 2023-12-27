import React, { useState } from "react";
import "./home.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import { Card } from "antd";
import { supabase } from "../../backend/CreateClient";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  async function getDataCards() {
    const { data, error } = await supabase.from("story_creation").select();
    if (data) {
      setData(data);
    }
  }
  // console.log("data from api", data);

  useEffect(() => {
    getDataCards();
  }, []);

  useEffect(() => {
    supabase
      .channel(`story_creation`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "story_creation" },
        (payload) => {
          // console.log("Change received on update!", payload);
          const recData = payload.new
          
           
          setData((prevData) => [...prevData, recData]);
          // console.log(data);
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "story_creation" },
        (payload) => {
          // console.log("Change received on insert!", payload);
          const recData = payload.new
          
           
            setData((prevData) => [...prevData, recData]);
            // console.log(data);
         
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(`story_creation`);
    };
  }, []);


  return (
    <>
      <Navbar />
      <div className="main_content">
        {data.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            extra={<Link to={`/viewnote/${card.id}`}>View More</Link>}
            style={{
              width: 300,
            }}
          >
            <p>{card.summary}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
