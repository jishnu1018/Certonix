import {Schema} from "mongoose"
import {model} from 'mongoose'

const demo = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const users=model('userdetails',demo)

export {users}