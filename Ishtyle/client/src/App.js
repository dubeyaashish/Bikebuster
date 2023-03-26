
import './App.css';
import {Route, Routes} from "react-router-dom"
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import SignupPage from './pages/SignupPage';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/test'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage/>} />
      </Route>
    </Routes>
    
    
  );
}

export default App;
