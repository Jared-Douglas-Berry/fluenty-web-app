import {
    connectDatabase,
    deleteDocumentById,
    getAllDocuments,
    insertDocument,
    updateDocumentById
} from "../../../../helpers/db-utils";

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
            title,
            pickedImage,
            pickedImage1,
            summary
        } = req.body;

        if (
            !title ||
            title.trim() === '' ||
            !summary ||
            summary.trim() === '' ||
            pickedImage === null ||
            (pickedImage && pickedImage.size === 0) ||
            pickedImage1 === null ||
            (pickedImage1 && pickedImage1.size === 0)
        ) {
            if (!title || title.trim() === '') {
                res.status(422).json({message: 'Invalid title'})
                await clientMD.close();
                return;
            } else if (!summary || summary.trim() === '') {
                res.status(422).json({message: 'Invalid summary'})
                await clientMD.close();
                return;
            } else if (pickedImage === null || (pickedImage && pickedImage.size === 0)) {
                res.status(422).json({message: 'Invalid picked service icon'})
                await clientMD.close();
                return;
            } else if (pickedImage1 === null || (pickedImage1 && pickedImage1.size === 0)) {
                res.status(422).json({message: 'Invalid picked service image'})
                await clientMD.close();
                return;
            }
        }

        const newService = {
            title,
            pickedImage,
            pickedImage1,
            summary,
            createdDate: new Date(),
        };

        let result;

        try {
            result = await insertDocument(clientMD, newService, process.env.mongodb_database, process.env.mongodb_database_services);
            newService._id = result.insertedId;

            res.status(201).json({message: 'Successfully Submitted Service', newService})
        } catch (error) {
            res.status(500).json({message: 'Inserting data failed'});
        }

    } else if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(clientMD, process.env.mongodb_database, process.env.mongodb_database_services, {_id: 1},);
            res.status(201).json({documents})

        } catch (error) {
            res.status(500).json({message: 'Getting comments failed'});
        }

        await clientMD.close();
    } else if (req.method === 'DELETE') {
        const {
            documentIdToDelete
        } = req.body;

        try {
            // Update the document
            const result = await deleteDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_services, documentIdToDelete);

            // Check the result
            if (result.modifiedCount === 1) {
                res.status(200).json({message: "Document Deleted successfully"});
            } else {
                res.status(404).json({message: "Document not found or not Deleted"});
            }
        } catch (error) {
            console.error("Error Deleting document:", error);
            res.status(500).json({message: "Internal server error"});
        } finally {
            // Close the connection
            await clientMD.close();
        }
    } else if (req.method === 'PUT') {
        const {
            title,
            pickedImage,
            pickedImage1,
            summary,
            documentIdToUpdate,
        } = req.body;

        const updatedData = {
            title,
            pickedImage,
            pickedImage1,
            summary,
            modifiedDate: new Date()
        };

        try {
            // Update the document
            const result = await updateDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_services, documentIdToUpdate, updatedData);

            // Check the result
            if (result.modifiedCount === 1) {
                res.status(200).json({message: "Document updated successfully"});
            } else {
                res.status(404).json({message: "Document not found or not updated"});
            }
        } catch (error) {
            console.error("Error updating document:", error);
            res.status(500).json({message: "Internal server error"});
        } finally {
            // Close the connection
            await clientMD.close();
        }
    }
}