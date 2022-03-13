import React,{ useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AppContext } from '../App';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Location from './Location';
import './ChosenHotel.css';
import Favorite from './Favorite';
import {useParams} from 'react-router-dom';

const ChosenHotel = (props) => {

    const [image, setImg] = useState([]);
    const [review, setReview] = useState([]);
    const [popup, setPopup] = useState(false);
    const { name, location  } = useContext(AppContext);
    const params =  useParams()
    console.log("params.hotel_id",params.hotel_id);

    const images = async() =>{
      const hid=params.hotel_id || props.chosenHotel
        try{
            const options = {
                method: 'GET',
                url: 'https://hotels-com-provider.p.rapidapi.com/v1/hotels/photos',
                params: {hotel_id: hid},
                headers: {
                  'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com',
                  'x-rapidapi-key': '8e714f6b88mshbb20deb3af21b66p17c12cjsnb08e0581e35c'
                  }
                };
                let res = await axios.request(options);
                console.log('img',res.data);
                await setImg(res.data);
        }catch(err){
            console.error(err);
        }try{
            const reviews = {
                method: 'GET',
                url: 'https://hotels-com-provider.p.rapidapi.com/v1/hotels/reviews',
                params: {locale: 'en_US', hotel_id: hid, page_number: '1'},
                headers: {
                  'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com',
                  'x-rapidapi-key': '8e714f6b88mshbb20deb3af21b66p17c12cjsnb08e0581e35c'
                }
              };
              
              let res = await axios.request(reviews);
              // console.log('review',res.data);
                console.log('review',res.data.groupReview[0].reviews);
                await setReview(res.data.groupReview[0].reviews);
        }catch(err){
            console.log(err);
        }
        
      }
      useEffect(() =>{
          images()
      },[]);

      //imgs
      function srcset(image, size, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
      }

  return(
    <div className="main-container">
      <div className="img-container">
        <ImageList
          sx={{ width: 650, height: 500 }}
                variant="quilted"
                cols={4}
                rowHeight={121}
            >
  {image.map((item,i) => {
      const m1 = i%3==0? 2 : 1;
      const m2 = i%4==0? 2 : 1;
    return (<ImageListItem key={item[i]} cols={m1 || 1} rows={m1 || 1}>
        <img
          {...srcset(item.mainUrl, 121, m1, m1)}
          // alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    )}
    )}
  </ImageList>
  </div>

  <div className="info-details-container">
    <Location/>
    
    <p className="p-name-locat">{name}, {location} </p>
      <div className="reviews">
        {review ? 
          review.map((item,index) => {
            if (index < 2){
              return (
                <div className="review-container">
                  <div className="bubble">{item.formattedRating? item.formattedRating : null}
                    <div className="bubble1"></div>
                    <div className="bubble2"></div>
                  </div>
                  <div className="summary">
                  <h2>{item.recommendedBy? item.recommendedBy : "Anonymous"}</h2>
                  <p>{item.summary}</p>
                  </div>
                </div>
                        )
                      }
                  }):null
              } 
          </div>
          <Favorite image={image[0]?image[0].mainUrl:null}/>
        </div>
         
  </div>
  ) 
};

{/* <button style={{marginTop:50px}} onClick={()=>setPopup(true)}>open all reviews</button>
            <AllReviews>
                {
                    review.map((item,index) => {
                        <p>{item.groupReview.reviews.summary}</p>
                    })
                }
            </AllReviews>
  */}
export default ChosenHotel;
