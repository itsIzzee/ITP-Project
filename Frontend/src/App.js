import './App.css';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async'
import Login from './components/User/Login';
import LoginSeller from './components/User/LoginSeller'
import Register from './components/User/Register';
import RegisterSeller from './components/User/RegisterSeller';
import Home from './components/home'; //temporary 
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import store from './store';
import { loaduser } from './Actions/userActions';
import { loadSeller } from './Actions/sellerActions';
import Profile from './components/User/Profile';
import ProfileSeller from './components/User/ProfileSeller';




function App() {


  useEffect(() => {
    store.dispatch(loaduser)
  })

  useEffect(() => {
    store.dispatch(loadSeller)
  })
 

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <ToastContainer/>
              <Routes>
              <Route path = '/home' element = {<Home/>} />
              

              <Route path = '/login' element = {<Login/>} />
              <Route path = '/loginSeller' element = {<LoginSeller/>} />

              <Route path = '/register' element = {<Register/>} />
              <Route path = '/registerSeller' element = {<RegisterSeller/>} />

              <Route path = '/myprofile' element = {<Profile/>} />
              <Route path = '/profileseller' element = {<ProfileSeller/>} />



                
              </Routes>
          <Footer/>
        {/* Other components can be added here */}
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;