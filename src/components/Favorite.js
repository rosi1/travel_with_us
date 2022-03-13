import React,{ useState, useContext } from 'react';
import Heart from "react-animated-heart";
import {AppContext} from '../App';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Favorite = (props) => {
  const {accessToken, chosenHotel, name, location} = useContext(AppContext);
    const [isClick,setClick] = useState(false);

    const addToFavorite = async() => {
      const decoded = jwt_decode(accessToken.accessToken);
      const userId = decoded.userId;
      console.log('addToFavorites',userId, chosenHotel);
      const img= props.image;
      try{
        let res = await axios.post(`http://localhost:3002/favorites`, {
          userId,
          chosenHotel,
          img,
          name,
          location  
          
        })
        console.log('res.data addToFavorites',res.data)
      }catch(e){
        console.log(e)
      }
      
    }
    return (
      <div className="heart" style={{zIndex: '999'}}>
        <Heart isClick={isClick} onClick={() => {setClick(!isClick);addToFavorite() }} />
      </div>
    );
};
export default Favorite;
