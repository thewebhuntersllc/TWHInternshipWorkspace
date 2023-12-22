import React, { useState } from "react";
import "./home.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import { Card } from "antd";

const Home = () => {
  // const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [ data, setData] = useState([])

  useEffect(() => {
  //  setData()
  }, [])
  

  return (
    <>
      <Navbar />
      <div className="main_content">



        {/* {data.map((card,index)=>(
           <Card
           key={index}
           title={card.title}
           extra={<Link to={`/viewnote/${card._id}`}>View More</Link>}
           style={{
             width: 300,
           }}
         >
           <p>
             {card.shortsummary}
           </p>
         </Card>
        ))} */}



        <Card
          title="Default size card"
          extra={<Link to={"/viewnote/123"}>View More</Link>}
          style={{
            width: 300,
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            eveniet est placeat distinctio blanditiis, quasi consequatur
            adipisci. Officiis, a enim dolore, esse dolores harum perferendis
            sunt ipsa voluptatibus suscipit deleniti!z
          </p>
        </Card>
        <Card
          title="Default size card"
          extra={<Link to={"/viewnote/123"}>View More</Link>}
          style={{
            width: 300,
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            eveniet est placeat distinctio blanditiis, quasi consequatur
            adipisci. Officiis, a enim dolore, esse dolores harum perferendis
            sunt ipsa voluptatibus suscipit deleniti!z
          </p>
        </Card>
        <Card
          title="Default size card"
          extra={<Link to={"/viewnote/123"}>View More</Link>}
          style={{
            width: 300,
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            eveniet est placeat distinctio blanditiis, quasi consequatur
            adipisci. Officiis, a enim dolore, esse dolores harum perferendis
            sunt ipsa voluptatibus suscipit deleniti!z
          </p>
        </Card>
        <Card
          title="Default size card"
          extra={<Link to={"/viewnote/123"}>View More</Link>}
          style={{
            width: 300,
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            eveniet est placeat distinctio blanditiis, quasi consequatur
            adipisci. Officiis, a enim dolore, esse dolores harum perferendis
            sunt ipsa voluptatibus suscipit deleniti!z
          </p>
        </Card>
        <Card
          title="Default size card"
          extra={<Link to={"/viewnote/123"}>View More</Link>}
          style={{
            width: 300,
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            eveniet est placeat distinctio blanditiis, quasi consequatur
            adipisci. Officiis, a enim dolore, esse dolores harum perferendis
            sunt ipsa voluptatibus suscipit deleniti!z
          </p>
        </Card>
        <Card
          title="Default size card"
          extra={<Link to={"/viewnote/123"}>View More</Link>}
          style={{
            width: 300,
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            eveniet est placeat distinctio blanditiis, quasi consequatur
            adipisci. Officiis, a enim dolore, esse dolores harum perferendis
            sunt ipsa voluptatibus suscipit deleniti!z
          </p>
        </Card>
        <Card
          title="Default size card"
          extra={<Link to={"/viewnote/123"}>View More</Link>}
          style={{
            width: 300,
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            eveniet est placeat distinctio blanditiis, quasi consequatur
            adipisci. Officiis, a enim dolore, esse dolores harum perferendis
            sunt ipsa voluptatibus suscipit deleniti!z
          </p>
        </Card>
        <Card
          title="Default size card"
          extra={<Link to={"/viewnote/123"}>View More</Link>}
          style={{
            width: 300,
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            eveniet est placeat distinctio blanditiis, quasi consequatur
            adipisci. Officiis, a enim dolore, esse dolores harum perferendis
            sunt ipsa voluptatibus suscipit deleniti!z
          </p>
        </Card>
      </div>
    </>
  );
};

export default Home;
