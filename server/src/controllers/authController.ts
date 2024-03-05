import passport from "passport";
import { Strategy as GoogleStrategy, StrategyOptions}  from "passport-google-oauth20";
import * as passportJwt from "passport-jwt";
import userModel, { TUser } from "../models/userModel.js";
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError.js";
import { ObjectId } from "mongoose";
const GoogleSecret = process.env.OAUTH20_GOOGLE_SECRET as string;
const GoogleClientId = process.env.OAUTH20_GOOGLE_CLIENT as string;
const JWTsecret = process.env.JWT_SECRET as string;
const JWTissuer = process.env.JWT_ISSUER as string;
const JWTaudience = process.env.JWT_AUDIENCE as string;
///
/// configs
///
const googleConfig : StrategyOptions = {
  clientID: GoogleClientId,
  clientSecret: GoogleSecret,
  callbackURL: '/auth/google/redirect'
};
const JWTConfig : passportJwt.StrategyOptionsWithoutRequest= {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWTsecret,
    issuer: JWTissuer,
    audience: JWTaudience
  };
const generateAccessToken = (userId: any) => {
  const expiresIn = '1 hour';
    const token = jwt.sign({}, JWTsecret, {
      expiresIn: expiresIn,
      audience: JWTaudience,
      issuer: JWTissuer,
      subject: userId.toString()
    })
    return token;
  }
export function generateUserToken(req: Request, res: Response, next : NextFunction) {
  const user = req.user as any;
  if(!user)
    return next(new AppError("Missing user data",400));
  const token = generateAccessToken(user.userId);
  res.status(202).json({
    status: "success",
    token: token
  });
}
export const passportJWT = new passportJwt.Strategy(JWTConfig, async (payload, done)=>{
    console.log(payload);
    const user = await userModel.findById(payload.sub
      );
    if (user) {
        return done(null, {userId: user.id}, payload);
    }
    return done(null, null,null);
})
export const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false, failWithError: true })(req, res, (err: Error) => {
    if (err) {
      return next(new AppError(`Odmowa depstepu: ${err.message}`, 401));
    }
    next();
  });
}
export const convertUserToBody = (req: Request, res: Response, next: NextFunction)=>{
  const user = req.user as any;
  req.body.userId = user.userId;
  console.log("boody ", req.body)
  console.log("user ", req.user)
  next();
}
export const passportGoogle20 =new GoogleStrategy(
    googleConfig, 
    async(accessToken, refreshToken, profile, done)=>{
      const newDoc = {
        providerId: profile._json.sub,
        name: profile._json.name,
        picture: profile._json.picture,
        provider: "google"
      }; 
      let user = await userModel.findOne({providerId: newDoc.providerId});
      if(!user)
          user = await userModel.create(newDoc);
  
      done(null, {
        userId: user.id,
        providerId: user.providerId,
        provider: user.provider
      });
})

