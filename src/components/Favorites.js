import React,{useState, useEffect, useContext } from 'react';
import './Favorites.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {AppContext} from '../App';
import {Link} from 'react-router-dom'


const Favorites = () => {

  const [favHotel, setFavHotel]= useState([])
  const {accessToken} = useContext(AppContext);
  useEffect(async() => {
    try{
      const decoded = jwt_decode(accessToken.accessToken);
      const userId = decoded.userId;
      let res = await axios.post(`http://localhost:3002/getMyFavorites`, {
          userId    
        })
        setFavHotel(res.data)
        console.log(res.data)

    }catch(e){
      console.log(e);
    }
  },[])
  return (
    <div className="fav-container">
        <section className="favorites-header">
            <h1 className="heading">
                <span>F</span>
                <span>a</span>
                <span>v</span>
                <span>o</span>
                <span>u</span>
                <span>r</span>
                <span>i</span>
                <span>t</span>
                <span>e</span>
                <span>s</span>
            </h1>
        </section>
        
        <div className="favorites-container">
        {
          favHotel.map((item,index)=>{
            return <Link to={`/chosen_hotel/${item.hotel_id}`}>
            <div className="favorites">
            <img style={{width:"200px",height:"150px"}} src={item.img}/>
            <div className="hotel_name" key={index}>{item.hotel_name}</div>
            <div className="hotel_location">{item.hotel_location}</div>
            </div>
            </Link>
          })
        }
        </div>
    </div>
  )
};

export default Favorites;
