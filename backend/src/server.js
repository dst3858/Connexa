import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

const app = express();

const PORT = ENV.PORT || 5001;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log('server started on port :', ENV.PORT);
    connectDB();
});
