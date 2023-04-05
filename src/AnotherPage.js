import React, { useContext } from "react";
import { Tabs, Space, Table, Image, Input, Button } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { url } from "./Login";

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
        <Button onClick={subscribe}>subscribe</Button>
      </Space>
    ),
  }
];

const columnRemove = [
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
        <Button onClick={removeSubscription}>remove</Button>
      </Space>
    ),
  }
];

function removeSubscription() {
}
function subscribe() {
}

function AnotherPage() {
  const [data, setData] = useState([]);
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  function handleTabClick(key) {
    if (key === 2) {
      axios
        .post(url + "queryDingYue", {
          email: user.email,
        })
        .then((response) => {
          if (response.data.code !== 200) {
            alert(response.data.msg);
          }
          else {
          console.log(response.data);
          let items = response.data.dataList;
          let itemsCopy = items.map((item, index) => {
            return { ...item, key: item.song_name };
          });
          console.log(itemsCopy);
        }
        })
        .catch((error) => console.error(error));
    }
  }
  if (!user) {
    navigate("/");
    return;
  }

  return (
    <Tabs
      onTabClick={handleTabClick}
      defaultActiveKey="2"
      centered
      items={[
        {
          label: `User`,
          key: 1,
          children: (
            <div style={{ textAlign: "center" }}>
              <Space direction="vertical" size={20}>
                <h3>username: {user.username}</h3>
                <Button onClick={() => setUser(null)}>Logout</Button>
              </Space>
            </div>
          ),
        },
        {
          label: `subscription`,
          key: 2,
          children: (
            <div
              style={{ textAlign: "center", width: "95%", margin: "0 auto" }}
            >
              <Table columns={columnRemove} dataSource={data} />
            </div>
          ),
        },
        {
          label: `query`,
          key: 3,
          children: <QueryArea />,
        },
      ]}
    />
  );
}

function QueryArea() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);

  function handleClick_Query() {

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

        <Button onClick={handleClick_Query}>Query</Button>
      </Space>
      <div style={{ textAlign: "center", width: "95%", margin: "0 auto" }}>
        <Table columns={columnSubscription} dataSource={data} />
      </div>
    </div>
  );
}
export default AnotherPage;
