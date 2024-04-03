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
            firstName,
            middleName,
            pickedImage,
            lastName,
            jobTitle,
            location,
            summary,
            phone,
            email,
            experience,
            linkin,
            facebook,
            twitter,
            instagram,
        } = req.body;

        if (
            !firstName ||
            firstName.trim() === '' ||
            !middleName ||
            middleName.trim() === '' ||
            !summary ||
            summary.trim() === '' ||
            !lastName ||
            lastName.trim() === '' ||
            !phone ||
            phone.trim() === '' ||
            phone.trim().length !== 10 ||
            !email ||
            email.trim() === '' ||
            !email.includes('@') ||
            pickedImage === null ||
            (pickedImage && pickedImage.size === 0) ||
            !jobTitle ||
            jobTitle.trim() === '' ||
            !location ||
            location.trim() === '' ||
            !experience ||
            !linkin ||
            linkin.trim() === '' ||
            !facebook ||
            facebook.trim() === '' ||
            !twitter ||
            twitter.trim() === '' ||
            !instagram ||
            instagram.trim() === ''
        ) {
            if (!firstName || firstName.trim() === '') {
                res.status(422).json({message: 'Invalid first Name'})
                await clientMD.close();
                return;
            } else if (!middleName || middleName.trim() === '') {
                res.status(422).json({message: 'Invalid middle Name'})
                await clientMD.close();
                return;
            } else if (!summary || summary.trim() === '') {
                res.status(422).json({message: 'Invalid summary'})
                await clientMD.close();
                return;
            } else if (!lastName || lastName.trim() === '') {
                res.status(422).json({message: 'Invalid last Name'})
                await clientMD.close();
                return;
            } else if (!phone || phone.trim() === '' || phone.trim().length !== 10) {
                res.status(422).json({message: 'Invalid phone number'})
                await clientMD.close();
                return;
            } else if (!email || email.trim() === '' || !email.includes('@')) {
                res.status(422).json({message: 'Invalid email address'})
                await clientMD.close();
                return;
            } else if (pickedImage === null || (pickedImage && pickedImage.size === 0)) {
                res.status(422).json({message: 'Invalid picked project image'})
                await clientMD.close();
                return;
            } else if (!jobTitle || jobTitle.trim() === '') {
                res.status(422).json({message: 'Invalid job title'})
                await clientMD.close();
                return;
            } else if (!location || location.trim() === '') {
                res.status(422).json({message: 'Invalid location'})
                await clientMD.close();
                return;
            } else if (!experience) {
                res.status(422).json({message: 'Invalid picked experience'})
                await clientMD.close();
                return;
            } else if (!linkin || linkin.trim() === '') {
                res.status(422).json({message: 'Invalid linkin https'})
                await clientMD.close();
                return;
            } else if (!facebook || facebook.trim() === '') {
                res.status(422).json({message: 'Invalid facebook https'})
                await clientMD.close();
                return;
            } else if (!twitter || twitter.trim() === '') {
                res.status(422).json({message: 'Invalid twitter https'})
                await clientMD.close();
                return;
            } else if (!instagram || instagram.trim() === '') {
                res.status(422).json({message: 'Invalid instagram https'})
                await clientMD.close();
                return;
            }
        }

        const newTeamMate = {
            firstName,
            middleName,
            pickedImage,
            lastName,
            jobTitle,
            location,
            summary,
            phone,
            email,
            experience,
            linkin,
            facebook,
            twitter,
            instagram,
            createdDate: new Date(),
        };

        let result;

        try {
            result = await insertDocument(clientMD, newTeamMate, process.env.mongodb_database, process.env.mongodb_database_team);
            newTeamMate._id = result.insertedId;

            res.status(201).json({message: 'Successfully Submitted Team Mate', newTeamMate})
        } catch (error) {
            res.status(500).json({message: 'Inserting data failed'});
        }

    } else if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(clientMD, process.env.mongodb_database, process.env.mongodb_database_team, {_id: 1},);
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
            const result = await deleteDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_team, documentIdToDelete);

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
                const result = await updateDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_team, isFeaturedId, updatedData);

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
                firstName,
                middleName,
                pickedImage,
                lastName,
                jobTitle,
                location,
                summary,
                phone,
                email,
                experience,
                linkin,
                facebook,
                twitter,
                instagram,
                documentIdToUpdate,
            } = req.body;

            const updatedData = {
                firstName,
                middleName,
                pickedImage,
                lastName,
                jobTitle,
                location,
                summary,
                phone,
                email,
                experience,
                linkin,
                facebook,
                twitter,
                instagram,
                modifiedDate: new Date()
            };

            try {
                // Update the document
                const result = await updateDocumentById(clientMD, process.env.mongodb_database, process.env.mongodb_database_team, documentIdToUpdate, updatedData);

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