import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_PASS } from './config';
interface areq extends Request {
    userId?:string
}
interface jwtPay extends JwtPayload {
    id:string
}

export const userMiddleWare = (req:areq, res:Response,next:NextFunction)=>{
    const header = req.headers['authorization'];
    const decoded = jwt.verify(header as string, JWT_PASS) as jwtPay;
    if (decoded){
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json("You are not logged in")
    }
}