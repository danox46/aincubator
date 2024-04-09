import { Request, Response } from "express";
import { ServiceHandler } from "../service-handler";
import { HttpStatusCode } from "../http-client";
import CircularJSON from "circular-json";
import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

export { HttpStatusCode, Request, Response };
export { IEvent, AppEvent } from "../service-handler";

export abstract class NetworkEvent {
  abstract readonly _req: Request;
  abstract readonly _res: Response;
  abstract readonly _status: HttpStatusCode;
  abstract log(): Promise<void>;
  abstract send(): Promise<void>;
  abstract end(): Promise<void>;
}

export class AppResponse extends Response implements NetworkEvent {
  readonly _req: Request;
  readonly _res: Response;
  readonly _status: HttpStatusCode;
  readonly _data: any;
  constructor(data: any, req: Request, res: Response, status: HttpStatusCode) {
    super();
    this._req = req;
    this._res = res;
    this._status = status;
    this._data = data;
  }
  log = async () => {
    const data = CircularJSON.stringify(this);
    ServiceHandler.post("/database/create", "database", {
      name: "log",
      ...JSON.parse(data),
    });
  };
  send = async () => {
    this._res.status(this._status).send(this._data);
  };
  end = async () => {
    this.log();
    this.send();
  };
}

export abstract class AppClient {
  static get: Function;
  static post: Function;
  static put: Function;
  static delete: Function;
  static patch: Function;
  static head?: Function;
  static connect?: Function;
  static options?: Function;
  static trace?: Function;
}

export const Confirmation = z.object({
  result: z.any().optional(),
  results: z.array(z.any()).optional(),
  total: z.number().optional(),
});

export type Confirmation = z.infer<typeof Confirmation>;

export enum TokenType {
  authorization = "Bearer",
}

export const Authorization = z.object({
  authorized: z.boolean().nullable().optional(),
  authenticated: z.boolean().nullable(),
  token: z.string().optional(),
  tokenType: z.nativeEnum(TokenType).optional(),
});

export type Authorization = z.infer<typeof Authorization>;

export const Credentials = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  accountId: z.string().optional(),
});

export type Credentials = z.infer<typeof Credentials>;
