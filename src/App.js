import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { UserProvider } from './UserContext';
import AnotherPage from './anotherPage';

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/another-page" element={<AnotherPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
