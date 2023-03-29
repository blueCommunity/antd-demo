import './App.css';
import { Card } from 'antd';
import 'antd/dist/reset.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {

    const navigate = useNavigate();

    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    function handleClick_Register() {
        //todo
        if (password != confirmPassword) {
            alert("please confirm password!")
        }
    }
    function handleClick_Back() {
        navigate('/');
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
                    <Input placeholder="input account number"
                        value={number}
                        onChange={(event) => setNumber(event.target.value)} />
                    <Input.Password
                        value={password}
                        placeholder="input password"
                        onChange={(event) => setPassword(event.target.value)}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <Input.Password
                        value={confirmPassword}
                        placeholder="cofirm password"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <Space>
                        <Button onClick={handleClick_Register} >Register</Button>
                        <Button onClick={handleClick_Back} >Back</Button>
                    </Space>
                </Space>
            </Card>

        </div>
    );
}

