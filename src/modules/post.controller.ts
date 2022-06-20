import express from 'express';
import config from '../config';
import logger from '../logger';
import PostService from './post.service';
import UserService from './user.service';

const postService = new PostService(config.database)
const userService = new UserService(config.database)

export const createPost = async(
    req:express.Request | any,
    res:express.Response
) =>{
    const newPost:any = {
        title:req.body.title,
        description:req.body.description,
        userID:req.userId
    }
    postService.create(newPost).then(async(post)=>{
        return res.status(200).json({
            message:"post created Successfully",
            success:true,
            post,
           
        })
}).catch((error:Error) => {
    logger.info("ERROR_IN_CREATING_POST")
    return res.status(500).json({
        message:"ERROR_IN_CREATING_POST",
        success:false
    })
})
    
}
//get own post
export const getOwnPost = async (
    req:express.Request | any,
    res:express.Response
) =>{
    const post:any = await postService.ownPost(req.userId)
    if(post){
        return res.status(200).json({
            message:"post found successfully",
            success:true,
            count:post.length,
            post
        })
    }else{
        return res.status(500).json({
            message:"post not found",
            success:false
        })
    }
}
