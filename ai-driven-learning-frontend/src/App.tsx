import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/' element={<div>HomePage</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
