import { Request } from "express";
import { UserPayLoad } from "./userPayLoad";

export interface AuthRequest extends Request {
    userData?: UserPayLoad;
}