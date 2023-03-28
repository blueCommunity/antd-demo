import './App.css';
import { Card } from 'antd';
import 'antd/dist/reset.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import AnotherPage from './AnotherPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
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
            <Button >Login</Button>
            <Router>
              <Routes>
                <Route path="/another-page" element={<AnotherPage />} />
              </Routes>
            </Router>
            <Link to='/another-page' >another</Link>
            <Button type="link">register</Button>
          </Space>
        </Space>
      </Card>

    </div>
  );
}

export default App;
