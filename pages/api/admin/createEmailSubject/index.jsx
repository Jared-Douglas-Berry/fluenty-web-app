import {connectDatabase, getAllDocuments, insertDocument, updateDocumentById} from "../../../../helpers/db-utils";

export default async function handler(req, res) {
    let clientMD;

    try {
        clientMD = await connectDatabase();
    } catch (error) {
        res.status(500).json({message: 'Connecting to the database failed'});
        return;
    }

    if (req.method === 'POST') {
        const {
            subjects,
            documentIdToUpdate,
            documentIdToDelete
        } = req.body;

        if (documentIdToUpdate !== null || documentIdToUpdate !== '') {
            const updatedData = {
                subjects,
                modifiedDate: new Date()
            };

            try {
                // Update the document
                const result = await updateDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_email_subjects, documentIdToUpdate, updatedData);

                // Check the result
                if (result.modifiedCount === 1) {
                    res.status(200).json({ message: "Document updated successfully" });
                } else {
                    res.status(404).json({ message: "Document not found or not updated" });
                }
            } catch (error) {
                console.error("Error updating document:", error);
                res.status(500).json({ message: "Internal server error" });
            } finally {
                // Close the connection
                await clientMD.close();
            }
        } else {
            if (
                !subjects
            ) {
                res.status(422).json({message: 'Invalid subjects'})
                await clientMD.close();
                return;
            }

            const newSubject = {
                subjects,
                createdDate: new Date(),
            };

            let result;

            try {
                result = await insertDocument(clientMD, newSubject, process.env.mongodb_database, process.env.mongodb_database_email_subjects);
                newSubject._id = result.insertedId;

                res.status(201).json({message: 'Successfully Submitted subjects', newSubject})
            } catch (error) {
                res.status(500).json({message: 'Inserting data failed'});
            }
        }
    } else if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(clientMD, process.env.mongodb_database, process.env.mongodb_database_email_subjects, {_id: 1},);
            res.status(201).json({subjects: documents})

        } catch (error) {
            res.status(500).json({message: 'Getting comments failed'});
        }

        await clientMD.close();
    }
}