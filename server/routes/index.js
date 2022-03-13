import express from 'express';
import {Register, Login, getUsers, Logout, favorites, getFavorites} from '../controllers/Users.js';
import {VerifyToken} from '../middleware/VerifyToken.js';
import { getCities } from '../controllers/Hotels.js';



const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/token', VerifyToken, (req, res) => {
    res.send(200).json({message:'accessToken'});
});

router.get('/users',VerifyToken, getUsers);
router.get('/logout', Logout)
router.get('/cities/:city',getCities);
// app.get('/cities/:city', async (req,res)=>{
router.post('/favorites',favorites)
router.post('/getMyFavorites', getFavorites)
export default router;