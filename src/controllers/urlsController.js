import { connection } from "../database.js";
import nodeUrlShortener from "node-url-shortener";

export async function urlShortener (request, response){

    try {
        const {url} = request.body;
        let shortUrl;
        await nodeUrlShortener.short(url, (error, url) => shortUrl = url );
        
        response.status(201).send(shortUrl);

    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }

}