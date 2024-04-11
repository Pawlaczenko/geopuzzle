import userModel from "../models/userModel.js";
import * as factoryHandler from "../utils/factoryHandler.js";

export const getUserDataById = factoryHandler.getOne(userModel) 