import { createProducts } from "./fakerSetup.js";

const seedData = createProducts(50);

////////////////////////
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();
////Your database connection string
const uri = "mongodb://127.0.0.1:27017";
const dbName = "test";

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db(dbName);
    const collection = db.collection("products");

    const result = await collection.insertMany(seedData);
    // console.log(`${result} documents were inserted`);
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await client.close();
    console.log("Connection to the database closed");
  }
}

seedDatabase();
