import './App.css';
import { Card } from 'antd';
import 'antd/dist/reset.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

function Login() {

    let navigate = useNavigate();
    function handleClick() {
        navigate('/another-page');

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
                    <Input placeholder="input account number" />
                    <Input.Password
                        placeholder="input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <Space>
                        <Button onClick={handleClick} >Login</Button>
                        <Button type="link">register</Button>
                    </Space>
                </Space>
            </Card>

        </div>
    );
}

export default Login;