import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, "../logs");

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) => {
    return stack
      ? `${timestamp} [${level}]: ${message} -\n ${stack}`
      : `${timestamp} [${level}]: ${message}`;
  }),
);

const FileFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  json(),
);

const filterLogs = (type: string) =>
  winston.format((info) => {
    return info.type === type ? info : false;
  })();

export const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: FileFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDir, "access.log"),
      level: "info",
      format: FileFormat,
    }),
    new winston.transports.File({
      format: FileFormat,
      filename: path.join(logDir, "combined.log"),
    }),

    new winston.transports.File({
      filename: path.join(logDir, "posts.log"),
      format: combine(filterLogs("posts"), FileFormat),
      level: "warn",
    }),

    new winston.transports.File({
      filename: path.join(logDir, "auth.log"),
      format: combine(filterLogs("auth"), FileFormat),
      level: "warn",
    }),
    new winston.transports.File({
      filename: path.join(logDir, "uploader.log"),
      format: combine(filterLogs("uploader"), FileFormat),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logDir, "email.log"),
      format: combine(filterLogs("email"), FileFormat),
      level: "error",
    }),
  ],
});
