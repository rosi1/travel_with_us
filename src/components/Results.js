import React,{ useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AppContext } from '../App';
import './result.css'
import {useNavigate} from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Results = (props) => {

  const [image, setImg] = useState([]);
  const { setChosenHotel, setLan, setLon,sort ,setSort, setName, setLocation } = useContext(AppContext);


    const handleChange = (event) => {
      console.log(event.target.value)
      setSort(event.target.value);
     
    };
  
  let navigate = useNavigate();

  const navigation = (itemId,itemName, itemLocation, itemLat, itemLon) => {
    setChosenHotel(itemId)
    setName(itemName)
    setLocation(itemLocation)
    setLan(itemLat)
    setLon(itemLon)
    navigate('/chosen_hotel')
  }

console.log(props.hotelDetails)

  return(
    <div>
      <div className="hotel-container">
      <h1 className="city-name">{props.hotelDetails[0].address.locality}</h1>
      <h2>Sort by </h2>
      <Select
          value={sort}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em></em>
          </MenuItem>
          <MenuItem value={"PRICE_HIGHEST_FIRST"}>Price (high to low)</MenuItem>
          <MenuItem value={"PRICE"}>Price (low to high)</MenuItem>
          <MenuItem value={"STAR_RATING_HIGHEST_FIRST"}>Star rating (high to low)</MenuItem>
          <MenuItem value={"STAR_RATING_LOWEST_FIRST"}>Star rating (low to high)</MenuItem>
        </Select>
        
        {
          props.hotelDetails.map((item,index)=> {
          return <div className="hotel-details" key={item.id}>
            <img className="hotel-img" src={`${item.optimizedThumbUrls.srpDesktop}`}/>
            <div className="parent-info">
              <div className="info">
                <h1>{item.name}</h1>
                <h2>{item.address.streetAddress}</h2>
                <h2>{item.neighbourhood}</h2>
                <li>{item.landmarks[0].distance} to {item.landmarks[0].label}</li>
                <div className="bubble">{item.guestReviews?(item.guestReviews.unformattedRating) *2 : "✖"}
                  <div className="bubble1"></div>
                  <div className="bubble2"></div>
                </div>
              <h3>{item.guestReviews? item.guestReviews.total : null} guest reviews</h3>
              </div>
              <div className="sec-info">
                <button className="btn-nav"onClick={()=>navigation(item.id,item.name,item.address.locality, item.coordinate.lat, item.coordinate.lon)}>check me out</button>
              </div>
              </div>
            {/* <div className="sec-info"> */}
              <h1 className="night-price">From: {item.ratePlan.price.current}</h1>
              {/* <button className="btn-nav"onClick={()=>navigation(item.id, item.coordinate.lat, item.coordinate.lon)}>check me out</button> */}
            {/* </div> */}
            
          </div>
          })
      } 
      </div>
    </div>
  )
};


export default Results;
