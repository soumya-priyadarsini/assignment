import 'dotenv/config';
import { DatabaseConfig } from './type';

interface RegistrationConfig {
    serverPort: number,
    database: DatabaseConfig,
    tokenSecret: string;
    
}
const config: RegistrationConfig = {
    serverPort: Number(process.env.SERVER_PORT) || 3001,
    database: {
        dbType: process.env.DB_TYPE ||'mongodb',
        dbName: process.env.DB_NAME ||'registration',
        host: process.env.DB_HOST ||'localhost',
        dbPort: process.env.DB_PORT || 27017
    },
    tokenSecret: process.env.TOKEN_SECRET || 'abcd',
 
}
export default config