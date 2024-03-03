import {MongoClient, ObjectId} from "mongodb";
// import { MongoClient, ObjectId } from "mongodb/lib/core/index";

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.foo9ysk.mongodb.net`

export async function connectDatabase() {
    const client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return client;
}

export async function insertDocument(client, document, dbName, collectName) {
    const db = client.db(dbName)

    const result = await db.collection(collectName).insertOne(document);

    return result;
}

export async function getAllDocuments(client, dbName, collectName, sort) {
    const db = client.db(dbName)

    const documents = await db.collection(collectName)
        .find()
        .sort(sort)
        .toArray();

    return documents;
}

export async function getDocumentId(client, dbName, collectName, sort, filter = {}) {
    const db = client.db(dbName)

    const documents = await db.collection(collectName)
        .find(filter)
        .sort(sort)
        .toArray();

    return documents;
}

export async function getDocumentIdFindOne(client, dbName, collectName, filter) {
    const db = client.db(dbName)

    const documents = await db.collection(collectName)
        .findOne(filter)

    return documents;
}

export async function getDocumentIdFind(client, dbName, collectName) {
    const db = client.db(dbName)

    const documents = await db.collection(collectName)
        .find({}, { _id: 1 })
        .toArray();

    return documents;
}

export async function updateDocumentById(client, dbName, collectName, id, updatedData) {
    const db = client.db(dbName);
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
        $set: updatedData // New data to be set
    };

    const result = await db.collection(collectName).updateOne(filter, updateDoc);

    return result;
}

export async function deleteDocumentById(client, dbName, collectName, id) {
    const db = client.db(dbName);
    const filter = { _id: new ObjectId(id) };

    const result = await db.collection(collectName).deleteOne(filter);

    return result;
}

export async function createUser(client, document, dbName, collectName) {
    const db = client.db(dbName)

    const result = await db.collection(collectName).insertOne(document);

    return result;
}

export async function existingUser(client, document, dbName, collectName) {
    const db = client.db(dbName)

    const result = await db.collection(collectName).findOne(document);

    return result;
}

export async function updateUser(client, document1, document2, dbName, collectName) {
    const db = client.db(dbName)

    const result = await db.collection(collectName).updateOne(document1, document2);

    return result;
}
