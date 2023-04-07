import React, { useContext } from "react";
import { Tabs, Space, Table, Image, Input, Button } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { url } from "./Login";
import QueryPage from "./queryPage";



function AnotherPage() {
  const [data, setData] = useState([]);
  const [user, setUser] = useContext(UserContext);

  
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
          <Button onClick={() => removeSubscription(record)}>remove</Button>
        </Space>
      ),
    }
  ];
  
  function removeSubscription(record) {
  
    axios
    .post(url + "rmDy", {
      email: user.email,
      title: record.key,
    })
    .then((response) => {
      if (response.data.code !== 200) {
        alert(response.data.msg);
      }
      else {
        alert("remove successfully");
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
            return { ...item, key: item.title };
          });
          setData(itemsCopy);
        }
        })
        .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
  }
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
            return { ...item, key: item.title };
          });
          setData(itemsCopy);
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
          children: <QueryPage />,
        },
      ]}
    />
  );
}


export default AnotherPage;
