import { Schema,model } from "mongoose";


const schema=Schema({
   photographer:{type:Schema.Types.ObjectId,ref:'Photogapher'},
   client:{type:Schema.Types.ObjectId,ref:'Client'},
   rating:{type:Number},
   message:{type:String},
   service:{type:Schema.Types.ObjectId,ref:'Service'}
    
})

const Review = model('Review',schema)
export default Review