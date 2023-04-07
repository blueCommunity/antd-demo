import React, { useContext, useState } from "react";
import { Tabs, Space, Table, Image, Input, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "./Login";
import { UserContext } from "./UserContext";


export default function QueryPage() {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [year, setYear] = useState("");
    const [data, setData] = useState([]);
    const [user, setUser] = useContext(UserContext);

    const columnSubscription = [
        {
          title: "title",
          dataIndex: "title",
          key: "title",
          render: (text) => <p>{text}</p>,
        },
        {
          title: "artist",
          dataIndex: "artist",
          key: "artist",
        },
        {
          title: "year",
          dataIndex: "year",
          key: "year",
        },
        {
          title: "action",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
              <Button onClick={() => subscribe(record, user)}>subscribe</Button>
            </Space>
          ),
        }
      ];
  
    function handleClick_Query() {
      if (title === "" && artist === "" && year === "") {
        axios
        .post(url + "getMusic")
        .then((response) => {
          let items = response.data;
          let itemsCopy = items.map((item, index) => {
            return { ...item, key: item.title };
          });
          setData(itemsCopy);
        })
        .catch((error) => console.error(error));
        return;
      }
      axios
        .post(url + "queryMusic", {
          title: title,
          artist: artist,
          year: year,
        })
        .then((response) => {
          if (response.data.code !== 200) {
            alert(response.data.msg);
          }
          else {
          console.log(response.data);
          let items = response.data.dataList;
          let itemsCopy = items.map((item, index) => {
            return { ...item, key: item.title };
          });
          console.log(itemsCopy);
          setData(itemsCopy);
        }
        })
        .catch((error) => console.error(error));
        
  
    }
    return (
      <div style={{ textAlign: "center", width: "95%", margin: "0 auto" }}>
        <Space size="middle">
          <Input
            value={title}
            placeholder="title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            value={artist}
            placeholder="artist"
            onChange={(event) => setArtist(event.target.value)}
          />
          <Input
            value={year}
            placeholder="year"
            onChange={(event) => setYear(event.target.value)}
          />
  
          <Button onClick={() => handleClick_Query()}>Query</Button>
        </Space>
        <div style={{ textAlign: "center", width: "95%", margin: "0 auto" }}>
          <Table columns={columnSubscription} dataSource={data} />
        </div>
      </div>
    );
  }


  function subscribe(record, user) {
    console.log(record, user);
    axios
      .post(url + "addDy", {
        email: user.email,
        title: record.key,
      })
      .then((response) => {
        if (response.data.code !== 200) {
          alert(response.data.msg);
        }
        else {
          alert("subscribe successfully");
        }
      })
      .catch((error) => console.error(error));
  }