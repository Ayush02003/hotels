const express = require("express");
const router = express.Router()
const Menu = require("./../models/Menu.js");
const { findByIdAndUpdate } = require("../models/Person.js");


router.put("/:id",async(req,res)=>{
    try{
        const data = req.body
        const id = req.params.id;
        const response = await Menu.findByIdAndUpdate(id,data,{
            new : true, //Return Updated document
            runValidators : true, // Run Mongose valiidation
        })
        if(!response){
            res.json({Messgae : "Data Not Found"})
        }
        res.status(200).json("Data Updated Successfully")
    }
    catch(err){
        console.log(err)
        res.status(err).json("Internal server error")
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const response = await Menu.findByIdAndDelete(id)
        if(!response){
            res.json({Messgae : "Data Not Found"})
        }
        res.status(200).json("Data Deleted Successfully")
    }
    catch(err){
        console.log(err)
        res.status(err).json("Internal server error")
    }
})
router.post("/",async (req,res)=>{
    try{
    const data = req.body;
    const newItem = new Menu(data);
    const response = await newItem.save()
    console.log("Data saved",response);
    res.status(200).json(response);
    }
    catch(err){ 
        console.log(err)
        res.status(err).json("Internal server error")
    }

})
router.get("/",async (req,res)=>{
   try{
    const data = await Menu.find()
   res.json(data);
   }
   catch(err){ 
    console.log(err)
    res.status(err).json("Internal server error")
}
})
router.get("/:taste",async (req,res)=>{
    try{
        const taste = req.params.taste
     const data = await Menu.find({taste:taste})
    res.json(data);
    }
    catch(err){ 
     console.log(err)
     res.status(err).json("Internal server error")
 }
 })
module.exports = router