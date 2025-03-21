import './App.css';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async'
import Login from './components/User/Login';
import Home from './components/home'; //temporary 

import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <ToastContainer/>
              <Routes>
              <Route path = '/home' element = {<Home/>} />
              

              <Route path = '/login' element = {<Login/>} />
                
              </Routes>
          <Footer/>
        {/* Other components can be added here */}
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;