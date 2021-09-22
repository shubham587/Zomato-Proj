import googleOAuth from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config({
  path: require("path").resolve(__dirname, "../.env"),
});
import { UserModel } from "../database/allModel";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "382136529891-3u1c7bcrdeue31djkkd8kjbvet7jtsc3.apps.googleusercontent.com",
        clientSecret: "gAew7GzH4QgaKCgQJOhZDb0A",
        callbackURL: "http://localhost:1000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // creating a new user object
        const newUser = {
          fullname: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        };
        try {
          // check if the user exist
          const user = await UserModel.findOne({ email: newUser.email });

          if (user) {
            // generate token
            const token = user.generateJwtToken();
            // return user
            done(null, { user, token });
          } else {
            // create new user
            const user = await UserModel.create(newUser);

            // generate token
            const token = user.generateJwtToken();
            // return user
            done(null, { user, token });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((userData, done) => done(null, { ...userData }));
  passport.deserializeUser((id, done) => done(null, id));
};