import React, { useState } from 'react';
import Login from './Login';
import Home from './Home';
import {Link, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import axios from 'axios';

import {activeContext} from '../helper/Context';


const Header = () => {
    const [menuBar, setMenuBar] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [active,setActive] = useState(false);

let navigate = useNavigate()

  const logout = async () => {
    try {
      let response = await axios.get('http://localhost:3002/logout',{
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      console.log(response);
      navigate('/login');
    } catch (e) {
      console.log(e);
      navigate('/login');
    }
  }

  return(
      <activeContext.Provider value={{active, setActive}}>
      <header>
        <div id="menu-bar" className={"fas fa-" + (menuBar ? "times" : "bars")} onClick={() => setMenuBar(!menuBar)} ></div>

        <a href="/" className="logo"><span>T</span>ravel</a>

        <nav className={"navbar "+ (menuBar ? "active" : "")}>
            <Link to="/">home</Link>
            <Link to="/hotels">Hotels</Link>
            <Link to="/favorites">Favourites</Link>
        </nav>
        <div className="icons">
            {/* <i className={"fas fa-" + (toggle ? "times" : "search")} id="icon-search"  onClick={() => setToggle(!toggle)}></i> */}
            <i className="fas fa-user" id="icon-user" onClick={() =>{ navigate('/login')} }></i>
            <i className="fas fa-sign-out-alt" onClick={logout}></i>
        </div>
        <form action="" className={"search-bar-container " + (toggle ? "active" : "")}>
            <input type="search" id="search-bar" placeholder="Search"/>
            <label htmlFor="search-bar" className="fas fa-search"></label>
        </form>
    </header>
    {/* <Login title={'Login'}/> */}
    {/* <Home /> */}
    </activeContext.Provider>
  ) 
};

export default Header;
