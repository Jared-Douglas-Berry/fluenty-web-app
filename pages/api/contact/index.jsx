import {connectDatabase, insertDocument} from "../../../helpers/db-utils";

export default async function handler(req, res) {
    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({message: 'Connecting to the database failed'});
        return;
    }

    if (req.method === 'POST') {
        const {email, name, message, phone, subject} = req.body;

        if (
            !email ||
            email.trim() === '' ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === '' ||
            !phone ||
            phone.trim() === '' ||
            phone.trim().length !== 10 ||
            !subject ||
            subject.trim() === ''
        ) {
            if (!email || !email.includes('@')) {
                res.status(422).json({message: 'Invalid email'})
                client.close();
                return;
            } else if (!name || name.trim() === '') {
                res.status(422).json({message: 'Invalid name'})
                client.close();
                return;
            } else if (!message || message.trim() === '') {
                res.status(422).json({message: 'Invalid message'})
                client.close();
                return;
            }  else if (!phone || phone.trim() === '' || phone.trim().length !== 10) {
                res.status(422).json({message: 'Invalid phone number'})
                client.close();
                return;
            }  else if (!subject || subject.trim() === '') {
                res.status(422).json({message: 'Invalid subject'})
                client.close();
                return;
            } else {
                res.status(422).json({message: 'Invalid email, subject, phone number, name and/ or message'})
                client.close();
                return;
            }
        }

        const newMessage = {
            email,
            name,
            phone,
            subject,
            message
        };

        let result;

        try {
            result = await insertDocument(client, newMessage, process.env.mongodb_database, process.env.mongodb_database_send_email);
            newMessage._id = result.insertedId;

            res.status(201).json({message: 'Successfully Submitted Comment', newMessage})
        } catch (error) {
            res.status(500).json({message: 'Inserting data failed'});
        }
    }
}