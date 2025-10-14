import { Inngest } from 'inngest';
import { connectDB } from './db.js';
import { User } from '../models/user.model.js';

// Create a client to send and receive events
export const inngest = new Inngest({ id: 'connexa' });

// sync user function
const syncUser = inngest.createFunction(
    { id: 'sync-user' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        await connectDB();
        const { id, email_addresses, first_name, last_name, image_url } =
            event.data;
        console.log(event.data);

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ''} ${last_name || ''}`,
            image: image_url,
        };
        await User.create(newUser);
        console.log('New user created:', newUser);

        //todo : do more things here
    }
);

//delete user from DB  function

const deleteUserFromDB = inngest.createFunction(
    { id: 'delete-user-from-db' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        await connectDB();
        const { id } = event.data;
        await User.deleteOne({ clerkId: id });
        console.log('User deleted from DB:', id);
        //await deleteStreamUser(id.toString());
    }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];
