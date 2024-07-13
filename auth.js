
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require('./models/Person')
const Menu = require('./models/Menu')
passport.use(new LocalStrategy(async (username,pass, done) => {
    try{
          const user = await Person.findOne({username})

            console.log("Receive credential") 
          
        // console.log(user)
        if(!user){
            return done(null,false,{msg:"Incorrect Username"});
        }
        const isPasswordMatch = await user.comparePassword(pass);
        if(isPasswordMatch){
            return done(null,user)
        }
        else{
            return done(null,false,{msg:"Incorrect Password"});
        }
    }
    catch(err){
        return done(err);
    } 
}))

// app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local',{session:false});
module.exports = localAuthMiddleware
