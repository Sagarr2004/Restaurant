import React,{useEffect,useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/basic/Headerfile/Header'
import Footer from './component/basic/Footer/Footer';
import Home from './component/basic/Home/Home';
import Contact from './component/basic/Contact/Contact';
import About from './component/basic/About/About';
import Restaurant from './component/basic/Restaurant/Restaurant';
import Signup from './component/basic/Login/Signup/Signup';
import OrderNow from './component/basic/OrderNow/OrderNow';
import Login from './component/basic/Login/Signup/Login';
import Cart from './component/basic/Cart/Cart';
import Profile from './component/basic/profile/Profile';

const App = () => {
  
  // const [login, setLogin] = useContext(CartContext);

  return (
    
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ordernow" element={<OrderNow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    
  );
};

export default App;

