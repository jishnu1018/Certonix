import {Router} from 'express'
import {authenticate} from '../Middleware/auth.js'
import {certis} from '../schemas/schema2.js'

const adminauth=Router()
const certi = new Map()

adminauth.post('/issue',authenticate,async(req,res)=>
    {
        try{
    
        
                const {CourseName,CertificateId,CandidateName,Grade,Issuedate} = req.body
                const result = await certis.findOne({certificateid:CertificateId})  
    
                if(result)
                    {
                        res.status(400).send("Certificate already issued")
                    }
                else
                    {
                        const newcerti = new certis(
                            {
                                
                                coursename:CourseName,
                                certificateid:CertificateId,
                                candidatename:CandidateName,
                                grade:Grade,
                                issuedate:Issuedate
                            }
                        )
            
                        await newcerti.save()
                        res.status(201).send("Successfully issued a Certificate")
                    }
            }    
        
        catch
        {
            res.status(500).send("Internal Server error")
        }
        
        
      
    })
    

//View certificate

adminauth.get('/view',authenticate,async(req,res)=>
    {
        try{
            const certi_id=req.query.certificateid 
            const result = await certis.findOne({certificateid:certi_id})
           
            if(result)
            {
                res.json(result)
                console.log(result)
               
               
            }
            else
            {
                res.status(400).json({message:"Certificate not available"})
            }
        }
        catch
        {
            res.status(500).json({message:"Internal server error"})
        }
    })

export {adminauth}