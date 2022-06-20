import MongoStoreService from '../services/mongo.service';
import { DatabaseConfig } from '../type';
import logger from '../logger';
import  Post  from './post.model';


//const PostProjecti = `_id user_name email password` 

class PostService extends MongoStoreService {
    dbConnection: any;

    constructor(options: DatabaseConfig) {
        super(options);
    }

    async init(): Promise<boolean> {
        this.dbConnection = await super.dbReady();
        if (this.dbConnection) {
            return true;
        }
        return false;
    }

    async create(query:any){
        try{
            logger.info('creating post')
            return await new Post(query).save()
        }catch(error){
            throw new Error(`Error getting post from collection ${error}`)
        }
    }
   async ownPost(query:any){
    try{
        logger.info("post found")
        return await Post.find({"userID" : query})
        .populate({
            path: 'userID',
            select: 'user_name email'
        })
    }catch(error){
        throw new Error(`Error getting post from collection ${error}`)
    }
   }
    
}
export default PostService
