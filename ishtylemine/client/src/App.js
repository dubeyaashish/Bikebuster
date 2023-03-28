
import './App.css';
import {Route, Routes} from "react-router-dom"
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import SignupPage from './pages/SignupPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { StylistContextProvider } from './StylistContext';
import StylistLoginPage from './pages/StylistLoginPage';
import StylistSignupPage from './pages/StylistSignupPage';
import StylistAccountPage from './pages/StylistAccountPage';
import AccountPage from './pages/AccountPage';


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <StylistContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/stylistlogin" element={<StylistLoginPage/>} />
        <Route path="/stylistsignup" element={<StylistSignupPage/>} />
        <Route path="/stylistaccount" element={<StylistAccountPage/>} />
        <Route path="/account/:subpage?" element={<AccountPage/>} />

        </Route>
      </Routes>
      </StylistContextProvider>
    </UserContextProvider>   
    
  )
}

export default App;
