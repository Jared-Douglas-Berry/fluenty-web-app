import { connectDatabase, existingUser, updateUser } from "../../../../../helpers/db-utils";
import { hashPassword, verifyPassword } from "../../../../../helpers/auth";

export default async function handler(req, res) {
    let client;
    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to database' });
        return;
    }

    if (req.method !== 'PATCH') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    console.log('------ test -------')
    let session;
    try {
        session = req.body.session;

        console.log('session', session);
        // Handle successful session retrieval
    } catch (error) {
        console.error("Error while getting server session:", error);
        // Handle the error appropriately
    }


    if (!session) {
        res.status(401).json({ message: 'Not Auth' });
        return;
    }

    const userEmail = session.token.token.user.email;
    const oldPassword = req.body.oldPassword;
    const newPasswordEntered = req.body.newPassword;
    const newConfirmPasswordEntered = req.body.confirmPassword;

    try {
        const user = await existingUser(client, { email: userEmail }, process.env.mongodb_database, process.env.mongodb_database_user);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const currentPassword = user.password;

        const isValid = await verifyPassword(oldPassword, currentPassword);

        if (!isValid) {
            res.status(403).json({ message: 'Invalid Old Password' });
            return;
        }

        if (newConfirmPasswordEntered !== newPasswordEntered) {
            res.status(403).json({ message: 'New password does not match confirm password' });
            return;
        }

        const newHashPasswordData = await hashPassword(newPasswordEntered);

        await updateUser(client, { email: userEmail }, { $set: { password: newHashPasswordData } }, process.env.mongodb_database, process.env.mongodb_database_user);

        res.status(200).json({ message: 'Updated Password!!!' });
    } catch (error) {
        console.error('Error processing request:', error);
        console.log('------ test 1-------')
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.close();
    }
}