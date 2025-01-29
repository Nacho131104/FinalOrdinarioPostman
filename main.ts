
import { MongoClient } from "mongodb";
import {  } from "./types.ts";

import { fromModeltoContacto} from "./resolvers.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("Agenda");
const ContactosCollection = mongoDB.collection("Contacto");

const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if (method === "GET") {
    if (path === "/users") {
    }
  } else if (method === "POST") {
    if (path === "/user") {
      
    }
  } else if (method === "PUT") {
    
  } else if (method === "DELETE") {
    

  }

  return new Response("endpoint not found", { status: 404 });
};

Deno.serve({ port: 3000 }, handler);


