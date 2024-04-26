import multer from "multer";
import express from "express";
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload =multer({storage:storage})
const Router= express.Router()

Router.post('/',upload.single('file'),(req,res)=>{
    try{
    res.status(200).json({url:`http://localhost:4999/${req.file.filename}`})}catch(e){
        res.status(500).json(e)
    }
})
export default Router