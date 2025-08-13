import { MongoClient } from "mongodb";

const uri = process.env.DB_CONNECTION as string;

if (!process.env.DB_CONNECTION) throw new Error("DB connection failed");

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;
