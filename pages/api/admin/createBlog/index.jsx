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
            author,
            title,
            paragraphOne,
            paragraphTwo,
            paragraphThree,
            pickedImage,
            pickedImage1,
            pickedImage2
        } = req.body;

        if (
            !author ||
            author.trim() === '' ||
            !title ||
            title.trim() === '' ||
            !paragraphOne ||
            paragraphOne.trim() === '' ||
            !paragraphTwo ||
            paragraphTwo.trim() === '' ||
            !paragraphThree ||
            paragraphThree.trim() === '' ||
            pickedImage === null ||
            (pickedImage && pickedImage.size === 0) ||
            (pickedImage1 && pickedImage1.size === 0) ||
            (pickedImage2 && pickedImage2.size === 0)
        ) {
            if (!author || author.trim() === '') {
                res.status(422).json({message: 'Invalid author'})
                await clientMD.close();
                return;
            } else if (!title || title.trim() === '') {
                res.status(422).json({message: 'Invalid title'})
                await clientMD.close();
                return;
            } else if (!paragraphOne || paragraphOne.trim() === '') {
                res.status(422).json({message: 'Invalid paragraph one'})
                await clientMD.close();
                return;
            } else if (!paragraphTwo || paragraphTwo.trim() === '') {
                res.status(422).json({message: 'Invalid paragraph two'})
                await clientMD.close();
                return;
            } else if (!paragraphThree || paragraphThree.trim() === '') {
                res.status(422).json({message: 'Invalid paragraph three'})
                await clientMD.close();
                return;
            } else if (pickedImage === null || pickedImage && pickedImage.size === 0) {
                res.status(422).json({message: 'Invalid picked blogs image'})
                await clientMD.close();
                return;
            } else if (pickedImage1 && pickedImage1.size === 0) {
                res.status(422).json({message: 'Invalid  picked blogs image 1'})
                await clientMD.close();
                return;
            } else if (pickedImage2 && pickedImage2.size === 0) {
                res.status(422).json({message: 'Invalid  picked blogs image 2'})
                await clientMD.close();
                return;
            }
        }

        const newBlog = {
            author,
            title,
            paragraphOne,
            paragraphTwo,
            paragraphThree,
            pickedImage,
            pickedImage1,
            pickedImage2,
            createdDate: new Date(),
        };

        let result;

        try {
            result = await insertDocument(clientMD, newBlog, process.env.mongodb_database, process.env.mongodb_database_blog);
            newBlog._id = result.insertedId;

            res.status(201).json({message: 'Successfully Submitted Blogs', newBlog})
        } catch (error) {
            res.status(500).json({message: 'Inserting data failed'});
        }
    } else if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(clientMD, process.env.mongodb_database, process.env.mongodb_database_blog, {_id: 1},);
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
            const result = await deleteDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_blog, documentIdToDelete);

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
            author,
            title,
            paragraphOne,
            paragraphTwo,
            paragraphThree,
            pickedImage,
            pickedImage1,
            pickedImage2,
            documentIdToUpdate,
        } = req.body;

        const updatedData = {
            author,
            title,
            paragraphOne,
            paragraphTwo,
            paragraphThree,
            pickedImage,
            pickedImage1,
            pickedImage2,
            modifiedDate: new Date()
        };

        try {
            // Update the document
            const result = await updateDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_blog, documentIdToUpdate, updatedData);

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