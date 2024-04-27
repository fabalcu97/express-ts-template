import logger, { morganMiddleware } from "./utils/logger";
import express, { type Express } from "express";
import cors from "cors";

import setRouter from "./routers";

const PORT = process.env.PORT || 3000;

export function startServer(app: Express) {
  app.use(morganMiddleware);
  app.use(express.json());
  app.use(cors());

  setRouter(app);

  app.use((err, _req, res, _next) => {
    logger.error(err);
    res.status(500).send("Something went wrong", err);
  });

  app.listen(3000, () => logger.info(`Server running on port ${PORT}`));

}