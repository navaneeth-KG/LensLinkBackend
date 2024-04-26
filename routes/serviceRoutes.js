import express from "express";
import Service from './../db/models/serviceSchema.js';


const router = express.Router()

//post service


router.post('/',async(req,res)=>{
 try{
    const body = req.body
    const service =await  Service.create(body)
    return res.json(service)
 }catch(e){
    return res.json(e)
 }

})


//get services

router.get('/',async(req,res)=>{
    try{
        const services = await Service.find()
        return res.json(services)
    }catch(e){
        return res.json(e)
    }
})

//get service by id
router.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const service = await Service.findById(id)
        return res.json(service)
    }catch(e){
        return res.json(e)
    }
})


export default router
