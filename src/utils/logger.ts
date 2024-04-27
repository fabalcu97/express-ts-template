import winston from "winston";
import morgan from "morgan";

const LOGS_DIR = "logs";

const { combine, timestamp, json } = winston.format;

const httpLogger = winston.createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A"
    }),
    json()
  ),
  transports: [new winston.transports.Console()]
});

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message: any) => httpLogger.http(message.trim())
    }
  }
);


const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: `${LOGS_DIR}/combined.log` })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}


export default logger;
export { morganMiddleware };