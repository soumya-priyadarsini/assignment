import express from 'express';
import bcrypt from 'bcrypt';
import fs from "fs";
import path from "path";
import config from '../config';
import logger from '../logger';
import {getToken} from '../jwt'

import UserService from './user.service';


const userService = new UserService(config.database)

export const signup = async (
    req:express.Request | any,
    res:express.Response
) => { 
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(req.body.password, salt);
      const user = {
        name:req.body.user_name,
        email:req.body.email,
        password:hashPass,
        phone:req.body.phone,
        image:{
            data: fs.readFileSync(path.join(req.file.path)),
            contentType: req.file.mimetype,
          },

    }
     fs.unlinkSync(req.file.path)
    const dupicateEmail:any = await userService.findUser({email:req.body.email})
    if(dupicateEmail){
        logger.info("THIS MAIL ID ALREADY EXISTS")
        return res.status(500).json({
            message:"THIS MAIL ID ALREADY EXISTS"
        })
    }
    userService.create(user).then(async(createUser:any) =>{
            return res.status(200).json({
                message:"Register Successfully",
                success:true,
                createUser,
               
            })
    }).catch((error:Error) => {
        logger.info("ERROR_IN_CREATING_USER")
        return res.status(500).json({
            message:"ERROR_IN_CREATING_USER",
            success:false
        })
    })
}

export const login = async(
    req:express.Request | any,
    res:express.Response
) => {
    const query:any = {
        email:req.body.email,
    }
    const user:any = await userService.findUser(query)
   
    
   const match = bcrypt.compareSync(req.body.password,user.password);
    if(match){
        logger.info("Login successfully")
        return res.status(200).json({
            message:"Login successfully",
            success:true,
            token: getToken(user._id)
        })
    }else{
        return res.status(500).json({
            message:"USER_NOT_FOUND",
            success:false
        })
    }
}

export const getUserById = async(
    req:express.Request | any,
    res:express.Response
) =>{
   
    const user: any = await userService.findUser({ _id: req.params.id });
    if(user){
        return res.status(200).json({
            message:"user found successfully",
            success:true,
            user
        })
    }else(
       res.status(500).json({
        message:"user not found",
        success:false
       })
    )
}