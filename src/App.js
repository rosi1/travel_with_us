import React, {useState,useEffect,createContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Hotels from './components/Hotels';
import Results from './components/Results';
import Search from './components/Search';
import ChosenHotel from './components/ChosenHotel';
import Favorites from './components/Favorites';
import {Auth} from './auth/Auth';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes,Route } from 'react-router-dom';

export const AppContext = createContext(null);

const App = () => {

  let navigate = useNavigate();

  const [accessToken, setAccessToken] = useState();
  const [text, setText] = useState('');
  const [inputValue, setInputValue]= useState('');
  const [hotelDetails, setHotelDetails] = useState([]);
  const [chosenHotel, setChosenHotel] = useState('');
  const [lan, setLan] = useState('');
  const [lon, setLon] = useState('');
  const [sort, setSort] = useState("STAR_RATING_HIGHEST_FIRST");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [cityCode, setCityCode] = useState("");
  const [count, setCount] = useState(2);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');

  useEffect(() =>{
  getCityCode()
},[sort])


const getCityCode= async() => {
        
        let code;
        try{
            let options = {
                method: 'GET',
                url: 'https://hotels-com-provider.p.rapidapi.com/v1/destinations/search',
                params: {query: `${inputValue}`, currency: 'USD', locale: 'en_US'},
                headers: {
                  'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com',
                  'x-rapidapi-key': '8e714f6b88mshbb20deb3af21b66p17c12cjsnb08e0581e35c'
                }
              };
              
            let res = await axios.request(options)
            // console.log(res.data)
            if(res.data){
                code = res.data.suggestions[0].entities[0].destinationId
                console.log(code)
                await setCityCode(code)
            }
        }catch(err){
            console.log(err)
        }
        try{
            let date = new Date(checkInDate)
            let checkDate = new Date(checkOutDate);
            let finaldatecheckInDate =  date.getFullYear()+ '-' +  (date.getMonth() + 1)  + '-' +  date.getDate();
            let finaldatecheckOutDate = checkDate.getFullYear()+ '-' +  (checkDate.getMonth() + 1)  + '-' +  checkDate.getDate() 
            // console.log('CheckInDate',finaldatecheckInDate );
            // console.log(cityCode)
            let options = {
            method: 'GET',
            url: 'https://hotels-com-provider.p.rapidapi.com/v1/hotels/search',
            params: {
                checkin_date: `${finaldatecheckInDate}`,
                checkout_date: `${finaldatecheckOutDate}`,
                sort_order: `${sort}`,
                destination_id: `${code}`,
                adults_number: `${count}`,
                locale: 'en_US',
                currency: 'USD',
                // children_ages: '4,0,15',
                // price_min: '10',
                // star_rating_ids: '3,4,5',
                // accommodation_ids: '20,8,15,5,1',
                // price_max: '500',
                // page_number: '1',
                // theme_ids: '14,27,25',
                // amenity_ids: '527,2063',
                // guest_rating_min: '4'
            },
            headers: {
                'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com',
                'x-rapidapi-key': '8e714f6b88mshbb20deb3af21b66p17c12cjsnb08e0581e35c'
            }
        };

        let response = await axios.request(options)
        console.log(response.data.searchResults.results)
        await setHotelDetails(response.data.searchResults.results);
        navigate('/results')
        }catch(err){
            console.log(err)
        }
    }
 
  return (
    <AppContext.Provider value={{
    accessToken,setAccessToken,
    text, setText,
    inputValue, setInputValue,
    hotelDetails, setHotelDetails,
    chosenHotel, setChosenHotel,
    lan, setLan, 
    lon, setLon,
    sort, setSort,
    checkInDate, setCheckInDate,
    checkOutDate, setCheckOutDate,
    cityCode, setCityCode,
    count, setCount, 
    name, setName,
    location, setLocation,
    getCityCode
    }}>
    <div className="App">
    
      <Header/>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login title={'Login'} />}/>
        <Route path="/register" element={<Register title={'Register'} />}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<Auth><Hotels /></Auth>}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/results" element={<Results hotelDetails={hotelDetails}/>}/>
        <Route path="/chosen_hotel/" element={<ChosenHotel chosenHotel={chosenHotel} />}/>
        <Route path="/chosen_hotel/:hotel_id" element={<ChosenHotel chosenHotel={chosenHotel} />}/>
      </Routes>
      </div>
      </AppContext.Provider>

  );
}

export default App;