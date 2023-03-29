import './App.css';
import { Card } from 'antd';
import 'antd/dist/reset.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {

    const navigate = useNavigate();
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');

    function handleClick_login() {
        navigate('/another-page');
        // alert(number);
        // todo
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
                    <Input value={number} 
                    placeholder="input account number"
                    onChange={(event) => setNumber(event.target.value)} />
                    <Input.Password value={password} 
                    onChange={(event) => setPassword(event.target.value)}
                        placeholder="input password"
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
