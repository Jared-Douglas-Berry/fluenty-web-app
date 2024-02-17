import {MongoClient} from "mongodb";

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.foo9ysk.mongodb.net/?retryWrites=true&w=majority`

export async function connectDatabase() {
    const client = await MongoClient.connect(
        connectionString
    );
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