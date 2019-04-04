const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKeys = keys.secretOrKeys;
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = passport => {
    // passport.use(
    //     new JwtStrategy(opts, async function(jwt_payload, done) {

    //         console.log(jwt_payload);
    //         // User.findOne({id: jwt_payload.sub}, function(err, user){
    //         //     if(err) {
    //         //         return done(err,false);
    //         //     }
    //         //     if(user) {
    //         //         return done(null, user);
    //         //     }else {
    //         //         return done(null, false);
    //         //         // or yuo could create a new account
    //         //     }
    //         // });
    //     })
    // );
    console.log(opts)

};