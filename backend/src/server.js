import '../instrument.mjs'; // sentry monitoring
import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from './config/inngest.js';
import { serve } from 'inngest/express';
import chatRoutes from './routes/chat.route.js';
//The name chatRoutes doesn’t come from the file —
//you choose it yourself when importing.
//Whatever that default export is, you can give it any name when you import it.
import * as Sentry from '@sentry/node';

const app = express();

const PORT = ENV.PORT || 5001;

app.use(express.json());
app.use(clerkMiddleware());
//req.auth will be available in req object
//The clerkMiddleware() function checks the request's cookies and headers for a session JWT and, if found, attaches the Auth object to the request object under the auth key.

app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error!');
});

app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.send('hello world');
});

Sentry.setupExpressErrorHandler(app);

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
