
const db = require('./db');
const express = require('express')
const app = express()
const Person = require('./models/Person')
const Menu = require('./models/Menu')
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // store in req.body
app.get('/',(req,res)=>{
    res.send('Hello World')
})


var personrouter = require("./routes/person_router")
app.use("/person",personrouter);


var menurouter = require("./routes/menu_router")
app.use("/menu",menurouter);
app.listen(3000,function(){
    console.log("server is running")
})
//modified version
