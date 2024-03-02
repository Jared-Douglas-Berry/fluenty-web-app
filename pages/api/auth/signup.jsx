import {connectDatabase, createUser, existingUser} from "../../../helpers/db-utils";
import {hashPassword} from "../../../helpers/auth";

export default async function handler(req, res) {
    let clientMD;
    try {
        clientMD = await connectDatabase();
    } catch (error) {
        res.status(500).json({message: 'Error connecting to database'})
        return;
    }

    if (req.method === 'POST') {
        const data = req.body;
        const { email, password, role, firstName, lastName, confirmPassword } = data;

        if (!email || !email.includes('@') || email.trim() === '') {
            res.status(422).json({message: 'Invalid Email'})
            await clientMD.close();
            return;
        }

        if (!password || password.trim() === '' || password.trim().length < 7) {
            res.status(422).json({message: 'Invalid Password: Password should also be at least 7 characters long'})
            await clientMD.close();
            return;
        }

        if (confirmPassword !== password && (!confirmPassword || confirmPassword.trim() === '' || confirmPassword.trim().length < 7)) {
            res.status(422).json({message: 'Invalid Password: Password does not match confirm password'})
            await clientMD.close();
            return;
        }

        if (!lastName || lastName.trim() === '') {
            res.status(422).json({message: 'Invalid last name'})
            await clientMD.close();
            return;
        }

        if (!role || role.trim() === '') {
            res.status(422).json({message: 'Invalid role'})
            await clientMD.close();
            return;
        }

        if (!firstName || firstName.trim() === '') {
            res.status(422).json({message: 'Invalid first name'})
            await clientMD.close();
            return;
        }

        const user = await existingUser(clientMD, {email: email}, process.env.mongodb_database , process.env.mongodb_database_user)

        if (user) {
            res.status(422).json({message: 'User Existed Already!!!'})
            await clientMD.close();
            return;
        }

        const hashPasswordData = await hashPassword(password);

        const document = {
            email: email,
            password: hashPasswordData,
            role: role,
            firstName: firstName,
            lastName: lastName
        };
        const result = await createUser(clientMD, document, process.env.mongodb_database , process.env.mongodb_database_user)

        res.status(200).json({message: 'Created User'})

    }
}