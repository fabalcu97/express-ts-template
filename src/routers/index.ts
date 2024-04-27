import { Express, Router } from "express";

import HelloWorldRouter from "./helloWorld";

export default function setRouter(app: Express) {
  const apiRouter = Router();

  apiRouter.use("/hello-world", HelloWorldRouter);

  app.use("/api", apiRouter);
}