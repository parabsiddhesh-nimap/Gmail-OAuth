const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

console.log(`
${process.env.GOOGLE_CLIENT_ID}
${process.env.GOOGLE_CLIENT_SECRET}
${process.env.GOOGLE_CALLBACK_URL}
`)

passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : process.env.GOOGLE_CALLBACK_URL ,
    passReqToCallback : true
}, function(request,accessToken,refreshToken,profile,done){
    console.log(profile);
    return done(null,profile)
}
));

passport.serializeUser( (user, done) => {
    done(null, user)
 })

 passport.deserializeUser((user, done) => {
    done (null, user)
  })

