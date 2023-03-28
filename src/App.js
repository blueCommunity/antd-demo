
import AnotherPage from './AnotherPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/another-page" element={<AnotherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
