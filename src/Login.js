import './App.css';
import { Card } from 'antd';
import 'antd/dist/reset.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleClick_login() {
        axios.get('http://124.221.171.220:8080/login', 
        {
            params: {
                email: username,
                password: password
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.code === 200) {
                    navigate('/another-page')
                }
                else {
                    alert(response.data.message)
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        
    }

    function handleClick_register() {
        navigate('/register')
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'rgb(176, 196, 222)'
        }}>
            <Card
                hoverable
                bordered={true}
                style={{
                    width: '200',
                }}
            >
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Input value={username} 
                    placeholder="please input email"
                    onChange={(event) => setUsername(event.target.value)} />
                    <Input.Password value={password} 
                    onChange={(event) => setPassword(event.target.value)}
                        placeholder="please input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <Space>
                        <Button onClick={handleClick_login} >Login</Button>
                        <Button onClick={handleClick_register} type="link">register</Button>
                    </Space>
                </Space>
            </Card>

        </div>
    );
}

export default Login;
