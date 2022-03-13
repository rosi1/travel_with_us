import React,{  useContext} from 'react';
import { AppContext } from '../App';
import { Map, GoogleApiWrapper } from "google-maps-react";


const Location = (props) => {

    const { lan, lon } = useContext(AppContext);
  return (
<div>
      <Map
            google={props.google}
            style={{ borderRadius:"5px",width:"36%", height:"24%" }}
            zoom = {14}
            initialCenter={
                {
                    lat: lan, 
                    lng: lon
                }
            }
          />
  </div>
  )
}

export default GoogleApiWrapper({
    apiKey:"AIzaSyDKtwOEIll2CSCg9mHadQYCk8L_LImTZr0"
})(Location);
