import { Router } from "express";
import * as userController from "../controllers/userController.js"
const userRouter = Router();
userRouter.route("/:id")
    .get(userController.getUserDataById)
export default userRouter;