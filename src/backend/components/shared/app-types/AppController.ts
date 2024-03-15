import { Request, Response } from "express";
import { AppObject, AppId, ObjectInfo, AppRecord } from "./AppObject";
import { AppResponse } from "./network";
import { HttpStatusCode } from "../http-client";
import { AppError } from "./AppError";

export abstract class AppController {
  protected _service: any;
  constructor(serice: any) {
    this._service = serice;
  }

  abstract listen(
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void>;
}

export abstract class AppObjectController extends AppController {
  constructor(serice: AppObject) {
    super(serice);
  }

  create = async (req: Request, res: Response, ...args: Array<any>) => {
    try {
      const properties: ObjectInfo = ObjectInfo.parse(req.body.properties);
      const confirmation = await this._service.create(properties);
      const appResponse = new AppResponse(
        confirmation,
        req,
        res,
        HttpStatusCode.Created
      );
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };

  batchCreate = async (
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void> => {
    try {
      const propertyArray: Array<ObjectInfo> = ObjectInfo.array()
        .nonempty()
        .parse(req.body.items);
      const confirmation = await this._service.batchCreate(propertyArray);
      const appResponse = new AppResponse(
        confirmation,
        req,
        res,
        HttpStatusCode.Created
      );
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };

  read = async (
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void> => {
    try {
      const id: AppId = AppId.parse(req.body._id);
      const accountInfo = await this._service.read(id);
      const appResponse = new AppResponse(
        accountInfo,
        req,
        res,
        HttpStatusCode.Ok
      );
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };

  list = async (
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void> => {
    try {
      const accountsInfo = await this._service.list();
      const appResponse = new AppResponse(
        accountsInfo,
        req,
        res,
        HttpStatusCode.Ok
      );
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };

  batchRead = async (
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void> => {
    try {
      const idArray: Array<AppId> = AppId.array()
        .nonempty()
        .parse(req.body.items);
      const accountsInfo = await this._service.batchRead(idArray);
      const appResponse = new AppResponse(
        accountsInfo,
        req,
        res,
        HttpStatusCode.Ok
      );
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };

  update = async (
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void> => {
    try {
      const updates = ObjectInfo.parse(req.body);
      AppId.parse(updates._id);
      AppRecord.parse(updates.properties);
      const confirmation = await this._service.update(updates);
      const appResponse = new AppResponse(
        confirmation,
        req,
        res,
        HttpStatusCode.Created
      );
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };

  batchUpdate = async (
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void> => {
    try {
      const propertyArray: Array<ObjectInfo> = ObjectInfo.array()
        .nonempty()
        .parse(req.body.items);
      const confirmation = await this._service.batchUpdate(propertyArray);
      const appResponse = new AppResponse(
        confirmation,
        req,
        res,
        HttpStatusCode.Created
      );
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };

  delete = async (
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void> => {
    try {
      const id: AppId = AppId.parse(req.body._id);
      const deleted = await this._service.delete(id);
      const appResponse = new AppResponse(deleted, req, res, HttpStatusCode.Ok);
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };

  batchDelete = async (
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void> => {
    try {
      const idArray: Array<AppId> = AppId.array()
        .nonempty()
        .parse(req.body.items);
      const deletedItems = await this._service.batchDelete(idArray);
      const appResponse = new AppResponse(
        deletedItems,
        req,
        res,
        HttpStatusCode.Ok
      );
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };
}
