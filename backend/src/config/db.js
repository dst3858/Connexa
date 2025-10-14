import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async () => {
    try {
        const connx = await mongoose.connect(ENV.MONGO_URI);

        console.log(
            '☃️ Mongo DB connected Successfully : ',
            connx.connection.host
        );
    } catch (errr) {
        console.log('Error connecting to MongoDB:', errr);
        process.exit(1); //status code 1 indicates error , code 0 indicates success
    }
};
