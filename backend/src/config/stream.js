import { StreamChat } from 'stream-chat';
import { ENV } from '../config/env.js';

const streamClient = StreamChat.getInstance(
    ENV.STREAM_API_KEY,
    ENV.STREAM_API_SECRET
);

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        console.log('stream user upserted successfully :', userData.name);
        return userData;
    } catch (errr) {
        console.log('error in upserting stream user :', errr);
    }
};

export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId);
        console.log('stream user deleted successfully :', userId);
    } catch (errr) {
        console.log('error in deleting stream user :', errr);
    }
};

export const generateStreamToken = (userId) => {
    try {
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (errr) {
        console.error('error in generating stream token :', errr);
        return null;
    }
};
