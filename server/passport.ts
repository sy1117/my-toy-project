import dotenv from 'dotenv'
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import { User } from './entity/User';
import { Auth } from './entity/Auth'

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
			callbackURL: "http://localhost:3000/auth/google/callback"
		},
		async (accessToken, refreshToken, profile, done) => {

			// return done();
			let {given_name:firstName, family_name:lastName, picture} = profile._json;
			console.log({
				firstName,
				lastName,
				picture
			}, profile._json, accessToken, refreshToken, done);

			let createdUser = await User.create({
				googleId:profile.id ,
				firstName,
				lastName,
				picture
			}).save();


			let session = await Auth.create({
				userId : createdUser.id,
				accessToken,
				refreshToken,
			}).save();

			console.log(createdUser, session)

			return done()
		}
	)
);

export default passport;
