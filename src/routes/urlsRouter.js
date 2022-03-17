import { Router } from "express";
import { urlShortener } from "../controllers/urlsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateTokenMiddleware, urlShortener);
urlsRouter.get("/urls/:shortUrl");
urlsRouter.delete("/urls/:id", validateTokenMiddleware);

export default urlsRouter;