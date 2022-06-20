import express from 'express';
import multer from 'multer';
import { validateToken } from './jwt'
import * as UserController from './modules/user.controller'
import * as PostController from './modules/post.controller'

const expressHealthCheck = require('express-healthcheck');

const router: express.Router = express.Router();

router.get('/up', expressHealthCheck())

//image upload
const upload = multer({ dest: 'uploads/' })

router.post('/register',upload.single('image'),UserController.signup);
router.post('/login',UserController.login),
router.get('/user/:id',validateToken,UserController.getUserById)

router.post('/post',validateToken,PostController.createPost)
router.get('/ownPost',validateToken,PostController.getOwnPost)

export default router;