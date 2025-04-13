import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

let client;

export const initializeDbConnection = async () => {
  try {
    if (!process.env.MONGODB_CONNECTION_STRING) {
      throw new Error(
        "MongoDB connection string is not defined in environment variables"
      );
    }

    client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING);

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("\n=== MongoDB Connection Error ===");
    console.error("Failed to connect to MongoDB. Troubleshooting steps:");
    console.error("1. Check if MongoDB is installed and running:");
    console.error("   - On Windows: Check if MongoDB service is running");
    console.error('   - On Mac/Linux: Run "ps aux | grep mongod"');
    console.error("\n2. Verify your .env file in the backend folder:");
    console.error("   - Ensure MONGODB_CONNECTION_STRING is set");
    console.error(
      "   - Default local connection should be: mongodb://localhost:27017"
    );
    console.error("   - If using MongoDB Atlas, verify your connection string");
    console.error("\n3. Check MongoDB port availability:");
    console.error("   - Default port is 27017");
    console.error("   - Ensure no other service is using this port");
    console.error('   - Try: "lsof -i :27017" on Mac/Linux');
    console.error("\n4. Specific Error Message:");
    console.error(`   ${error.message}`);
    console.error(
      "\nFor more help, visit: https://www.mongodb.com/docs/manual/installation/"
    );
    console.error("=====================================\n");
    throw error;
  }
};

export const getDbConnection = (dbName) => {
  const db = client.db(dbName);
  return db;
};
