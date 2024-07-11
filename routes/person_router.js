const express = require("express");
const router = express.Router();
const Person = require("./../models/Person.js");

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Person.findByIdAndDelete(id)
    if(!response){
        return res.status(404).json({error : 'Person Not Found'})
    } 
    res.status(200).json("Person Deleted Successfully");

  } 
  catch (err) {
    console.log("err");
   res.status(err).json("Internal server error");
  }
});
router.put("/:id", async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;
      const response = await Person.findByIdAndUpdate(id,data,{
          new : true, //Return Updated document
          runValidators : true, // Run Mongose valiidation
      })
      if(!response){
          console.log("Not found")
          return res.status(404).json({error : 'Person Not Found'})
      } 
      res.status(200).json(response);
  
    } 
    catch (err) {
      console.log("err");
     res.status(err).json("Internal server error");
    }
  });
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("Data saved", response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(err).json("Internal server error");
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(err).json("Internal server error");
  }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(err).json("Internal server error");
  }
});

module.exports = router;
