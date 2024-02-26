import {connectDatabase, getAllDocuments} from "../../../helpers/db-utils";


export default async function handler(req, res) {
    let clientMD;
    try {
        clientMD = await connectDatabase();
    } catch (error) {
        res.status(500).json({message: 'Error connecting to database'})
        return;
    }

    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(clientMD, process.env.mongodb_database , process.env.mongodb_database_user, {_id: 1},);
            res.status(201).json({documents})

        } catch (error) {
            res.status(500).json({message: 'Getting comments failed'});
        }

        await clientMD.close();

    }
}