import mongoose from 'mongoose'
import config from './config.js';

const myDB=async()=>{
    await mongoose.connect(config.MONGO_URL)
    console.log('database connected');
    
}

export default myDB