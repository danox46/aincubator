import { NetworkEvent, Request, Response, HttpStatusCode } from "./network";
import CircularJSON from "circular-json";
import dotenv from "dotenv";
dotenv.config();
import { ServiceHandler } from "../service-handler";
import { ZodError } from "zod";
import { MongoAPIError, MongoError } from "mongodb";

export class AppError extends Error implements NetworkEvent {
  readonly _req: Request;
  readonly _res: Response;
  readonly _status: HttpStatusCode = HttpStatusCode.InternalServerError;
  readonly message: string;

  constructor(
    error: any,
    req: Request,
    res: Response,
    status: HttpStatusCode = HttpStatusCode.InternalServerError
  ) {
    let message: string | undefined = undefined;

    if (Array.isArray(error) || error.name === "ZodError") {
      const zodError: ZodError = error;
      message = JSON.stringify(zodError.issues);
    }

    if (!message)
      message =
        error.response?.data.error || // App error
        error.response?.data ||
        error.response?.body ||
        error.message || // Axios Error
        "Unknow Error";

    super(message);
    this.message = message || "Unknow Error";
    this._req = req;
    this._res = res;

    if (error instanceof MongoAPIError || error instanceof MongoError) {
      if (message?.toLowerCase().includes("empty"))
        this._status = HttpStatusCode.NotFound;
      if (this._status) return;
    }

    this._status =
      Array.isArray(error) || error.name === "ZodError"
        ? 400
        : error.status ||
          error.response?.status ||
          error.response?.statusCode ||
          status;
  }

  log = async () => {
    let data = CircularJSON.stringify(this);
    ServiceHandler.post("/database/create", "database", {
      name: "log",
      ...JSON.parse(data),
    });
  };
  send = async () => {
    this._res.status(this._status).send({ error: this.message });
  };
  end = async () => {
    this.log();
    this.send();
  };
}
