import {Router} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { users } from '../schemas/schema1.js'


dotenv.config()

const userauth=Router()


//signup page
userauth.post('/signup',async(req,res)=>
{
    try{

        const {Name,Email,Password} = req.body
    
        const exisistinguser = await users.findOne({email:Email}) 
        
        if(exisistinguser)
        {
            res.status(400).send("User already exists")
        }
        else
        {
            const newpswd= await bcrypt.hash(Password,10)
            const newuser = new users(
                {
                    name:Name,
                    email:Email,
                    password:newpswd,
                }
            )

            await newuser.save()
            res.status(201).send("Successful Registration")
        }
    }

    catch
    {
        res.status(500).send("Internal Server error")
    }
        
})



//login page
userauth.post('/login', async (req,res)=>
{
    try
    {
        const {Email,Password} = req.body
        
        const result = await users.findOne({email:Email})   
        console.log(result)

        if(result)
        { 
            const valid = await bcrypt.compare(Password,result.password)
            console.log(valid)
        
            if(valid)
            {
                const token = jwt.sign({Email:result.email},process.env.SECRET_KEY,{expiresIn:'1h'})
                res.cookie('userauthtoken',token,{httpOnly:true})
                res.status(200).send("Login Successfull")
            }
            else{
                res.status(401).send("Unauthorized access")
            }


        }
        else{
            res.status(400).send("Email not registered")
        }
    }

    catch
    {
        res.status(500).send("Internal Server error")
    }
})

userauth.get('/logout',(req,res)=>
    {
        res.clearCookie('userauthtoken')
        res.status(200).send("Logged Out.....")
    })
    

export {userauth}