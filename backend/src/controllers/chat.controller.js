import { generateStreamToken } from '../config/stream.js';

export const getStreamToken = (req, res) => {
    try {
        const token = generateStreamToken(req.auth().userId);
        res.status(200).json({ token });
    } catch (errr) {
        console.error('error in getting stream token :', errr);
        res.status(500).json({ message: ' Failed to generate stream token ' });
    }
};
