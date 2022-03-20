import { nanoid } from "nanoid";
import { urlsRepository } from "../repositories/urlsRepository.js";

export async function urlShortener (request, response){

    try {
        const { id } = response.locals.user;
        const { url } = request.body;
        const shortUrl = nanoid(8);
      
        await urlsRepository.create(url, shortUrl, id)
      
        response.status(201).send({
          shortUrl
        })

    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }

}

export async function getUrl(request, response){
    try {
        const { shortUrl } = request.params;
  
        const result = await urlsRepository.getByShortUrl(shortUrl)
        if (result.rowCount === 0) {
            return response.sendStatus(404)
        }

        const [url] = result.rows;
        await urlsRepository.incrementVisitCount(url.id);

        delete url.visitCount;
        delete url.userId;

        response.send(url);

    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}

export async function deleteUrl(request, response){
    try {
        const { id } = request.params;
  
        const result = await urlsRepository.getByIdAndUserId(id, response.locals.user.id);
        if (result.rowCount === 0) {
            return response.sendStatus(401);
        }

        await urlsRepository.deleteUrl(id)

        response.sendStatus(200);

    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
}