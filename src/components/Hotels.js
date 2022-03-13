import React, {useState, useEffect, useContext} from 'react';
import './Hotels.css';
import Search from './Search';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { AppContext } from '../App';
import {useNavigate} from 'react-router-dom';


const Hotels = () => {

    const { inputValue,count,checkInDate, setCheckInDate,checkOutDate, setCheckOutDate,setCount, sort, getCityCode} = useContext(AppContext);
    // const [cityCode, setCityCode] = useState("");
    
    let navigate = useNavigate();

// //DATES
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);

  const handleCheckInDate = (e) => {
    setCheckInDate(e);
    setCheckOutDate(null);
  };
  const handleCheckOutDate =(e) => {
    setCheckOutDate(e);
  };

  //COUNTER OF ADULTS
  // const [count, setCount] = useState(2);
  //COUNTER OF CHILDREN
  const [countChild, setCountChild] = useState(0);

  //ADULTS  
  const handleSubtractOne = () => {
      (count === 1) ? setCount(1) : setCount(count - 1);
 }
 const handleAddOne = () => {
    setCount(count + 1);
 }
//CHILDREN
 const handleSubtractOneChild = () => {
    (countChild === 0) ? setCountChild(0) : setCountChild(countChild - 1);
}
const handleAddOneChild = () => {
  setCountChild(countChild + 1);
}
//Room
const [room,setRoom] =useState(1);
const addRooms=() => {
    setRoom(room + 1);
}

useEffect(() =>{
  console.log('getCityCode',sort)
},[sort])


    //Guests drop down
    const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const submitAll=(e)=>{
      e.preventDefault();
    console.log(inputValue)
    getCityCode();
  }
  return(
    <div className="container">
        <section className="book" id="book">
            <h1 className="heading">
                <span>H</span>
                <span>o</span>
                <span>t</span>
                <span>e</span>
                <span>l</span>
                <span>s</span>
            </h1>
           
            <div className="row">
                <form onSubmit={submitAll}>
                    <div className="search">
                        <Search/>
                    </div>

        <div className="dates-container">
            <div>
            <h3>Check-in <CalendarTodayIcon/></h3>
            <DatePicker
            
                selected={checkInDate}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                onChange={(e)=>handleCheckInDate(e)}
            />
            </div>
        <div>
          <h3>Check-out <CalendarTodayIcon/></h3>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={checkOutDate}
            minDate={checkInDate}
            onChange={(e)=>handleCheckOutDate(e)}
          />
        </div>
      </div>
    
        <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <Box sx={{ marginRight:3, position: 'relative', background: 'none',borderBottom:'1px solid #09c2c2'}}>
        <button id="guest-btn" type="button" onClick={handleClick}>
            <h4 style={{display: 'inline'}}> <PeopleAltIcon sx={{ fontSize: 20, marginBottom:-0.7 }}/> Gusets</h4>
            <p>{`${room}`} room, {`${count}`} adults, {`${countChild}`} childs</p>
        </button>
        {open ? (
          <Box sx={styles}>
              <h2 style={{textDecoration: 'underline'}}>Room 1</h2>
              <p><span style={{fontSize:10}}>Adults: </span><button style={btnStyle} onClick={handleSubtractOne}><PersonRemoveAlt1Icon sx={{ fontSize: 15,marginBottom:-0.5 }}/></button>
            <span style={{fontSize:13, margin:5}}>{`${count}`}</span>
            <button style={btnStyle} onClick={handleAddOne}><PersonAddAlt1Icon sx={{ fontSize: 15,marginBottom:-0.5 }}/></button></p>
            <p style={{paddingBottom:1, borderBottom:"1px solid gray"}}><span style={{fontSize:10}}>children: </span><button style={btnStyle} onClick={handleSubtractOneChild}><PersonRemoveAlt1Icon sx={{ fontSize: 15,marginBottom:-0.5 }}/></button>
            <span style={{fontSize:13, margin:5}}>{`${countChild}`}</span>
            <button style={btnStyle} onClick={handleAddOneChild}><PersonAddAlt1Icon sx={{ fontSize: 15,marginBottom:-0.5 }}/></button></p>
            <button onClick={()=>addRooms()}>Add Room</button>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
      
                    <input type="submit"  className="btn" value="book now"/>
                </form>
            </div>
        </section>
    </div>
  ) 
};



const styles = {
    position: 'absolute',
    top: 35,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    p: 1,
    bgcolor: 'rgba(0,0,0,0.9)',
  
  };
  const btnStyle={
      background:'none',
      color:'white',
      marginRight: 1, 
      cursor:'pointer'
    
  }

export default Hotels;
