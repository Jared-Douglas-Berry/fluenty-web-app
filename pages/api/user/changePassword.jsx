import {getServerSession} from "next-auth/next";
import {connectDatabase, existingUser, updateUser} from "../../../helpers/db-utils";
import {hashPassword, verifyPassword} from "../../../helpers/auth";

export default async function handler(req, res) {
    let client;
    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({message: 'Error connecting to database'})
        return;
    }

    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getServerSession({req: req});

    if (!session) {
        res.status(401).json({message: 'Not Auth'});
        return;
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPasswordEntered = req.body.newPassword;

    const user = await existingUser(client, {email: userEmail}, 'Users')

    if (!user) {
        res.status(404).json({message: 'User not found'})
        client.close();
        return;
    }

    const currentPassword = user.password;

    const isValid = await verifyPassword(oldPassword, currentPassword);

    if (!isValid) {
        res.status(403).json({message: 'Invalid Old Password'})
        client.close();
        return;
    }

    const newHashPasswordData = await hashPassword(newPasswordEntered);

    const newPassword = await updateUser(client, {email: userEmail}, { $set: { password: newHashPasswordData}},  'Users');

    client.close();
    res.status(200).json({message: 'Updated Password!!!'})
}