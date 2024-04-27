import express from "express";
import { configDotenv } from "dotenv";

import { startServer } from "./app";

configDotenv();
const app = express();

startServer(app);

