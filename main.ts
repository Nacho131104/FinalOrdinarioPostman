
import { MongoClient } from "mongodb";
import {  ContactModel} from "./types.ts";

import { fromModeltoContacto} from "./resolvers.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("Agenda");
const ContactosCollection = mongoDB.collection<ContactModel>("Contactos");

const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if (method === "GET") {
    if (path === "/contactos") {
      const Contactos = (await ContactosCollection.find().toArray()).map(contacto => ({
        ...contacto,
        _id: contacto._id.toString(), // Convierte ObjectId a string
      }));
      
      console.log(Contactos);
      
      return new Response(JSON.stringify(Contactos), {status: 200});
    } else if(path ==="/contacto"){
      const name = url.searchParams.get("nombreyApellidos");
      if(!name){throw new Error("Se necesita un nombre")};
      const contacto = await ContactosCollection.find( (c:ContactModel) => c.nombreYApellidos = name);
      if(!contacto) throw new Response("Contacto no encontrado");
      return new Response(JSON.stringify(contacto));
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


