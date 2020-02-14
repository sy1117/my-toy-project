import dotenv from 'dotenv'
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

dotenv.config();
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
	console.log(profile.id, accessToken, refreshToken, done);
	return done();
	//    User.findOrCreate({ googleId: profile.id }, function (err, user) {
	//      return done(err, user);
	//    });
}
));

export default passport;
