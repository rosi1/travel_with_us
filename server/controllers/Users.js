import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/dbKnex.js';

export const getUsers = async (req,res) =>{
    try {
      const users = await Users.findAll({
        attributes:['id','email']
      });
      res.json(users)
    } catch (e) {
      console.log(e);
    }
  }

export const Register = async (req, res) =>{
    console.log(req.body)
    const {email, password} = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt);
    try {
        await Users.create({
            email: email,
            password: hashPassword
        });
        res.json({message:'Succesfuly registered'})
    }catch(err) {
        console.log(err);
        res.status(404).json({message:'Email already exist'})
    }
}

export const Login = async (req, res) => {
    const emailLow = req.body.email.toLowerCase()
    try{
        const user = await Users.findAll({
            where: {
                email:emailLow
            }
        })
        console.log('user',user)
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({message:'Password mismatch'});
        const userId = user[0].id;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1d'
        })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge:60 * 1000 * 60 * 24
        })
        res.json({accessToken})
    }catch(err) {
        console.log(err);
        res.status(404).json({message:'Email not found'});
    }
}

export const Logout = (req,res) => {
    const accessToken = req.cookies.accessToken ||
                        req.headers['x-access-token'] ||
                        req.headers['authorization'];
    if(!accessToken) return res.sendStatus(204);
    res.clearCookie('accessToken')
    return res.sendStatus(200);
  }

  export const favorites = async(req, res) => {
    //   console.log(req.body)
    //   res.json({msg: 'Favorites'})
    try {
        const fav = await db('favorites')
        .insert({user_id: req.body.userId,
          hotel_id: req.body.chosenHotel,
          img: req.body.img,
          hotel_name: req.body.name,
          hotel_location: req.body.location
          })
        
        res.json(fav)
      } catch (e) {
        console.log(e);
        res.json({message:e})
  }
}

export const getFavorites = async(req, res) => {
  try{
    const fav = await db('favorites')
    .select("img", "hotel_name", "hotel_location","hotel_id")
    .where({user_id: req.body.userId})
    res.json(fav)
  }catch(e){
    console.log(e)
    res.json({message:e})
  }
}