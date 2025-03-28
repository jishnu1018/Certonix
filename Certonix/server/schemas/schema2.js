import {Schema} from "mongoose"
import {model} from 'mongoose'

const demo2 = new Schema({
    coursename:{type:String,required:true},
    certificateid:{type:String,required:true},
    candidatename:{type:String,required:true},
    grade:{type:String,required:true},
    issuedate:{type:String,required:true}
})

const certis=model('coursedetails',demo2)

export {certis}