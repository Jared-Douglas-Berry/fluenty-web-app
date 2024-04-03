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
            client,
            title,
            pickedImage,
            category,
            date,
            location,
            challenge,
            results
        } = req.body;

        if (
            !client ||
            client.trim() === '' ||
            !title ||
            title.trim() === '' ||
            !challenge ||
            challenge.trim() === '' ||
            !category ||
            category.trim() === '' ||
            !results ||
            results.trim() === '' ||
            pickedImage === null ||
            (pickedImage && pickedImage.size === 0) ||
            !date ||
            date.trim() === '' ||
            !location ||
            location.trim() === ''
        ) {
            if (!client || client.trim() === '') {
                res.status(422).json({message: 'Invalid client'})
                await clientMD.close();
                return;
            } else if (!title || title.trim() === '') {
                res.status(422).json({message: 'Invalid title'})
                await clientMD.close();
                return;
            } else if (!challenge || challenge.trim() === '') {
                res.status(422).json({message: 'Invalid challenge'})
                await clientMD.close();
                return;
            } else if (!category || category.trim() === '') {
                res.status(422).json({message: 'Invalid category'})
                await clientMD.close();
                return;
            } else if (!results || results.trim() === '') {
                res.status(422).json({message: 'Invalid results'})
                await clientMD.close();
                return;
            } else if (pickedImage === null || (pickedImage && pickedImage.size === 0)) {
                res.status(422).json({message: 'Invalid picked project image'})
                await clientMD.close();
                return;
            } else if (!date || date.trim() === '') {
                res.status(422).json({message: 'Invalid date'})
                await clientMD.close();
                return;
            } else if (!location || location.trim() === '') {
                res.status(422).json({message: 'Invalid location'})
                await clientMD.close();
                return;
            }
        }

        const newProject = {
            client,
            title,
            pickedImage,
            category,
            date,
            location,
            challenge,
            results,
            createdDate: new Date(),
        };

        let result;

        try {
            result = await insertDocument(clientMD, newProject, process.env.mongodb_database, process.env.mongodb_database_projects);
            newProject._id = result.insertedId;

            res.status(201).json({message: 'Successfully Submitted Project', newProject})
        } catch (error) {
            res.status(500).json({message: 'Inserting data failed'});
        }

    } else if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(clientMD, process.env.mongodb_database, process.env.mongodb_database_projects, {_id: 1},);
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
            const result = await deleteDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_projects, documentIdToDelete);

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
                const result = await updateDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_projects, isFeaturedId, updatedData);

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
                client,
                title,
                pickedImage,
                category,
                date,
                location,
                challenge,
                results,
                documentIdToUpdate,
            } = req.body;

            const updatedData = {
                client,
                title,
                pickedImage,
                category,
                date,
                location,
                challenge,
                results,
                modifiedDate: new Date()
            };

            try {
                // Update the document
                const result = await updateDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_projects, documentIdToUpdate, updatedData);

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