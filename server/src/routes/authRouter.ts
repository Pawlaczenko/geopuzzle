import { Router } from "express";
import passport from "passport";
import { generateUserToken } from "../controllers/authController.js";


const authRouter = Router();

authRouter.get("/google", passport.authenticate("google",{
    session: false,
    scope: ["profile"]
}));
authRouter.get("/google/redirect", passport.authenticate("google", { session: false }), generateUserToken)
export default authRouter;
