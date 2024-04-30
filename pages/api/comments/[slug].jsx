import {connectDatabase, getDocumentId, insertDocument, updateCommentWithReply} from "../../../helpers/db-utils";

async function handler(req, res) {
    const slug = req.query.slug;

    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({message: 'Connecting to the database failed'});
        return;
    }



    if (req.method === 'POST' && req.body._id) {
        const comments = req.body;

        try {
                const newReply = {
                    email: comments.email,
                    name: comments.name,
                    text: comments.text,
                    createdDate: new Date(),
                };

                const result = await updateCommentWithReply(process.env.mongodb_database, process.env.mongodb_database_comments, client, comments._id, newReply);
                console.log('result', result);
                console.log('result.modifiedCount', result.modifiedCount);
                if (result.modifiedCount !== 1) {
                    res.status(500).json({ message: 'Updating comment failed' });
                    client.close();
                    return;
                }
                res.status(201).json({ message: 'Successfully Submitted Replies' });
        } catch (error) {
            res.status(500).json({ message: 'Inserting data failed' });
        }
    } else if (req.method === 'POST') {
        const {email, name, text} = req.body;

        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            if (!email || !email.includes('@')) {
                res.status(422).json({message: 'Invalid email'})
                client.close();
                return;
            } else if (!name || name.trim() === '') {
                res.status(422).json({message: 'Invalid name'})
                client.close();
                return;
            } else if (!text || text.trim() === '') {
                res.status(422).json({message: 'Invalid comment'})
                client.close();
                return;
            } else {
                res.status(422).json({message: 'Invalid email, name and/ or comment'})
                client.close();
                return;
            }
        }

        const newComment = {
            email,
            name,
            text,
            slug,
            createdDate: new Date(),
        };

        let result;

        try {
            result = await insertDocument(client, newComment, process.env.mongodb_database, process.env.mongodb_database_comments);
            newComment._id = result.insertedId;

            res.status(201).json({message: 'Successfully Submitted Comment', newComment})
        } catch (error) {
            res.status(500).json({message: 'Inserting data failed'});
        }

    } else if (req.method === 'GET') {
        try {
            const documents = await getDocumentId(client, process.env.mongodb_database, process.env.mongodb_database_comments, {_id: -1}, { slug: slug });
            res.status(201).json({comments: documents})

        } catch (error) {
            res.status(500).json({message: 'Getting comments failed'});
        }

        client.close();
    }
}

export default handler;