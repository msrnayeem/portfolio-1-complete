// js/db.js

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log('Connected to the MongoDB server');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

async function close() {
    await client.close();
    console.log('Connection to MongoDB closed');
}

module.exports = { client, connect, close, ObjectId };
