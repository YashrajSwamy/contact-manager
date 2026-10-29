import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        address:{
            type:String
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps:true
    }
)

const contactModel = mongoose.model("Contact",contactSchema);

export default contactModel;