import "./App.css";
import { Card } from "antd";
import "antd/dist/reset.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const url = 'http://ec2-44-202-245-210.compute-1.amazonaws.com:8080/';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useContext(UserContext);

  function handleClick_login() {
      // 异步登录，发送请求到服务器验证用户信息
      // 验证通过后，将用户信息存储在上下文中
      axios.post(url + "login", {
          email: username,
          password: password,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            console.log(response.data.data.user_name);
            const user = {
              username: response.data.data.user_name,
              email: response.data.data.email,
            };
            setUser(user);
            navigate("/another-page");
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    
  }

  function handleClick_register() {
    navigate("/register");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgb(176, 196, 222)",
      }}
    >
      <Card
        hoverable
        bordered={true}
        style={{
          width: "200",
        }}
      >
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Input
            value={username}
            placeholder="please input email"
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input.Password
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="please input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Space>
            <Button onClick={handleClick_login}>Login</Button>
            <Button onClick={handleClick_register} type="link">
              register
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
}

export default Login;
