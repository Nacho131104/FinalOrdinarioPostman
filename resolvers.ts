
import type { APIworldtime,APIvalidatePhone,ContactModel,Contacto } from "./types.ts"



export const fromModeltoContacto =async(Contacto: ContactModel):Promise<Contacto> =>{
    const API_KEY = Deno.env.get("API_KEY");
    if(!API_KEY) throw new Error("Necestias una api key para acceder a las apis");


    const{nombreYApellidos,telefono,pais,timezone} = Contacto
    

    const url= `/https://api.api-ninjas.com/v1/worldtime?timezone=${timezone}`;
    const data= await fetch(url,{
        headers: {
            "X-API-KEY":API_KEY,
        }
    })

    if(data.status !==200)throw new Error("Error en la api ninja");

    const response: APIworldtime = await data.json();
    return {
        id:Contacto._id!.toString(),
        nombreYApellidos,
        telefono,
        pais,
        hora: response.datetime
    }

}