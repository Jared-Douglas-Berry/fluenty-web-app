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
        } = req.body;

            if (
                !title ||
                title.trim() === '' ||
                pickedImage === null ||
                (pickedImage && pickedImage.size === 0)
            ) {
                if (!title || title.trim() === '') {
                    res.status(422).json({message: 'Invalid title'})
                    await clientMD.close();
                    return;
                } else if (pickedImage === null || (pickedImage && pickedImage.size === 0)) {
                    res.status(422).json({message: 'Invalid picked tech stack icon'})
                    await clientMD.close();
                    return;
                }
            }

            const newTechStack = {
                title,
                pickedImage,
                createdDate: new Date(),
                isFeatured: false,
            };

            let result;

            try {
                result = await insertDocument(clientMD, newTechStack, process.env.mongodb_database, process.env.mongodb_database_tech);
                newTechStack._id = result.insertedId;

                res.status(201).json({message: 'Successfully Submitted Tech Stack', newTechStack})
            } catch (error) {
                res.status(500).json({message: 'Inserting data failed'});
            }
    } else if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(clientMD, process.env.mongodb_database, process.env.mongodb_database_tech, {_id: 1},);
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
            // Deleting the document
            const result = await deleteDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_tech, documentIdToDelete);

            // Check the result
            if (result && result.deletedCount === 1) {
                res.status(200).json({ message: "Document Deleted successfully" });
            } else {
                res.status(404).json({ message: "Document not found or not Deleted" });
            }
        } catch (error) {
            console.error("Error deleting document:", error);
            res.status(500).json({ message: "Internal Server Error" });
        } finally {
            // Close the connection
            await clientMD.close();
        }
    } else if (req.method === 'PUT') {
        if (req.body.isFeaturedId) {
            const {
                isFeatured,
                isFeaturedId,
            } = req.body;

            const updatedData = {
                isFeatured,
                modifiedDate: new Date()
            };

            try {
                // Update the document
                const result = await updateDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_tech, isFeaturedId, updatedData);

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
        } else {
            const {
                title,
                pickedImage,
                documentIdToUpdate,
            } = req.body;

            const updatedData = {
                title,
                pickedImage,
                modifiedDate: new Date()
            };

            try {
                // Update the document
                const result = await updateDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_tech, documentIdToUpdate, updatedData);

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
}