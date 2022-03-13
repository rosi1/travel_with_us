import React,{ useState, useEffect, useContext } from 'react';
import sea from '../img/flamingo.mp4';
// import sheep from '../img/sheep.mp4';
import river from '../img/sunset.mp4';
import beach from '../img/beach.mp4';
import {AppContext} from '../App';

const Home = () => {
const [video, setVideo] = useState();
const [active1, setActive1] = useState(false);
const [active2, setActive2] = useState(false);
const [active3, setActive3] = useState(false);
// const [active4, setActive4] = useState(false);

const {accessToken} = useContext(AppContext);

const setAllActive = ()=>{
    setActive1(false);
    setActive2(false);
    setActive3(false);
    // setActive4(false);
}

    useEffect(()=>{
        setVideo(river)
        setActive1(true)
    },[])
  return(
    <>
        <section className="home" id="home">
            <div className="content">
                {/* <Booking/> */}
                <h3>Travel, Discover, <span>Enjoy</span></h3>
                {/* <p>Discover new places with us</p> */}
                {/* <a href="#" className="btn">discover more</a> */}
                <div className="controls">
                    <span className={"vid-btn " + (active1 ? "active" : "")} onClick={()=> {setVideo(river);setAllActive();setActive1(true);}}></span>
                    <span className={"vid-btn " + (active2 ? "active" : "")} onClick={()=> {setVideo(sea);setAllActive();setActive2(true);}}></span>
                    {/* <span className={"vid-btn " + (active3 ? "active" : "")} onClick={()=> {setVideo(sheep);setAllActive();setActive3(true);}}></span> */}
                    <span className={"vid-btn " + (active3 ? "active" : "")} onClick={()=> {setVideo(beach);setAllActive();setActive3(true);}}></span>
                </div>
            </div>
            
            <div className="video-container">
                <video autostart autoPlay muted src={video} type="video/mp4" />
            </div>
        </section>
    </>
  )
};

export default Home;
