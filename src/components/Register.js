import React,{ useContext, useState, useEffect} from 'react';
import {activeContext} from '../helper/Context';
import {Link, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {toast} from 'react-toastify'
import {AppContext} from '../App';

const Register = ({title}) => {

    const {active, setActive} = useContext(activeContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const {setAccessToken} = useContext(AppContext);

    let navigate = useNavigate();

    useEffect(() => {
      setMsg('')
    },[])

    const handleAction = async(id) => {
      // console.log('handleAction', id)
      // const emailLow = email.toLowerCase()
      if(id === 'Register'){
        try{
          let res = await axios.post('http://localhost:3002/register',{
            email,password
          },{
            withCredentials: true,
            headers: {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json'
            }
          })
          console.log('register response',res);
          navigate('/login');
        }
        catch(err){
          console.log('error',err)
          setMsg(err.res.data.message)
          toast.error(err.res.data.message)
        }
      }else{
        try{
          let res = await axios.post('http://localhost:3002/login',{
            email,password
          },{
            withCredentials: true,
            headers: {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json'
            }
          })
          console.log('login response',res);
          navigate('/home');
        }catch(err){
          console.log('error',err)
          setMsg(err.res.data.message)
          toast.error(err.res.data.message)
        }
      }
    }

  return (
    <div className="upper-container">
        <div className={"login-form-container"}>
            <h3>{title}</h3>
            <Box component="form"
              sx={{m:1}}
              noValidate
              autoComplete='off'
            >
              <TextField
                sx={{m:1}}
                id="email"
                label="Enter email"
                variant="outlined"
                onChange={e=>setEmail(e.target.value)}
              />
              <TextField
                sx={{m:1}}
                id="password"
                label="Enter password"
                variant="outlined"
                onChange={e=>setPassword(e.target.value)}
              />
            </Box>
            <Button variant="contained" onClick={()=>handleAction(title) }>{title}</Button>
          
        <div>
          {msg}
        </div>
        <div>
          {title === 'Register'? 
          <p>Have an account? <Link to='/login'>Login now</Link></p> :
          null
          }
        </div>
      </div>
      </div>
   
  )
};

export default Register;
