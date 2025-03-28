import express,{json} from 'express'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/issuecerti.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app=express() 

app.use(json())

app.use(cors({
    origin:'*',
    credentials:true
}))

app.use('/',userauth)
app.use('/',adminauth)

mongoose.connect('mongodb://mongodb:27017/certiapp').then(()=>
    {
        console.log("MongoBD connected successfully to certiapp")
    })
    .catch((error)=>
    {
        console.error("Mongodb connection failed",error)
    })

app.listen(9000,function(){
    console.log("server is listening at 9000")
})