require("dotenv").config();

const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URI;

const client = new MongoClient(URI);

const connectToMongodb = async () => {
  try {
    await client.connect();
    console.log("cliente conectado");
    return client;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const disconnectToMongodb = async () => {
  try {
    await client.close();
    console.log("cliente Desconectado");
    return client;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { connectToMongodb, disconnectToMongodb };
