import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from './config/inngest.js';
import { serve } from 'inngest/express';

const app = express();

const PORT = ENV.PORT || 5001;

app.use(express.json());
app.use(clerkMiddleware());
//req.auth will be available in req object
//The clerkMiddleware() function checks the request's cookies and headers for a session JWT and, if found, attaches the Auth object to the request object under the auth key.

app.use('/api/inngest', serve({ client: inngest, functions }));

app.get('/', (req, res) => {
    res.send('hello world');
});

const startServer = async () => {
    try {
        await connectDB();
        if (ENV.NODE_ENV !== 'production') {
            app.listen(ENV.PORT, () => {
                console.log('server started on port :', ENV.PORT);
            });
        }
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Exit the process with an error code
    }
};

startServer();

export default app;
