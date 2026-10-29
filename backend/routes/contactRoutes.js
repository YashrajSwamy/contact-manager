import express from 'express';

import contactModel from '../models/Contact.js';

const contactRouter = express.Router();

contactRouter.get("/", async (req,res)=>{
    try
    {
        const contacts = await contactModel.find({user: req.user})
        res.status(200).json(contacts);
    }
    catch(error)
    {
        return res.status(500).json({message:"Internal Server Error"});
    }
});

contactRouter.post("/", async (req,res)=>{
    try 
    {
        const {name,phone,email,address} = req.body;

        if(!name || !phone || !email)
        {
            return res.status(400).json({
                message:"Enter All Details"
            })
        }

        const contact = await contactModel.create({name,phone,email,address,user:req.user});

        res.status(201).json({
            message:"Contact Added"
        });
    }
    catch(error)
    {
        return res.status(500).json({message:"Internal Server Error"});
    }
});


contactRouter.get("/:id", async (req,res) => {
    try 
    {
        const contact = await contactModel.findOne({_id: req.params.id,user:req.user});

        if(!contact)
        {
            return res.status(400).json({
                message:"Invalid Contact ID"
            })
        }

        res.status(200).json(contact);
    }
    catch(error)
    {
        return res.status(500).json({message:"Internal Server Error"});
    }
});


contactRouter.patch("/:id", async(req,res)=>{
    try
    {
        const {name,phone,email,address} = req.body;

        const contact = await contactModel.findOneAndUpdate({
            _id: req.params.id,user:req.user},
            {name,phone,email,address}, 
            {new:true, runValidators: true});

        if(!contact)
        {
            return res.status(400).json({
                message:"Invalid Contact ID"
            });
        }

        res.status(200).json(contact);
    }
    catch(error)
    {
        return res.status(500).json({message:"Internal Server Error"});
    }
})


contactRouter.delete("/:id", async(req,res)=>{
    try
    {
        const contact = await contactModel.findOneAndDelete({_id:req.params.id,user:req.user});
        
        if(!contact)
        {
            return res.status(400).json({
                message:"Invald Contact ID"
            })
        }

        res.status(200).json({message:"Contact Deleted"});
    }
    catch(error)
    {
        return res.status(500).json({message:"Internal Server Error"});
    }
})
export default contactRouter;