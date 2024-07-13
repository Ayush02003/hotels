
const db = require('./db');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const auth = require('./auth')
require('dotenv').config();
app.use(bodyParser.json()) // store in req.body

app.get('/',auth,(req,res)=>{
    res.send('Hello World')
})


var personrouter = require("./routes/person_router")
app.use("/person",auth,personrouter);


var menurouter = require("./routes/menu_router")
app.use("/menu",auth,menurouter);
const PORT =  process.env.PORT || 3000
app.listen(PORT,function(){ 
    console.log("server is running")
})
//modified version

