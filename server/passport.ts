import dotenv from 'dotenv'
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import { User } from './entity/User';
import { Auth } from './entity/Auth'
// import { signToken } from './authService';

dotenv.config();
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:8080/auth/google/callback"
		},
		async (accessToken, refreshToken, profile, done) => {

			// return done();
			let {given_name:firstName, family_name:lastName, picture} = profile._json;

			let createdUser = await User.create({
				googleId:profile.id ,
				firstName,
				lastName,
				picture
			}).save();

			// check if user already exists
			const currentUser = await User.findOne({ googleId: profile.id });
			if (currentUser) {
				// already have the user -> return (login)
				return done(null, currentUser);
			} else {
				// register user and return
				const newUser = await User.create({ firstName, lastName, picture, googleId: profile.id }).save();
				return done(null, newUser);
			}
		}
	)
);

export default passport;
