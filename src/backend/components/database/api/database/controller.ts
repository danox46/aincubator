import { DatabaseService } from "./service";
import {
  AppObjectController,
  AppResponse,
  AppError,
  IEvent,
  HttpStatusCode,
  Request,
  Response,
  AppObject,
  AppDocument,
  ObjectInfo,
} from "../../../shared/app-types";

export class DatabaseController extends AppObjectController {
  private static instance: DatabaseController | null = null;
  #database: DatabaseService;
  private constructor() {
    const dbInstace = DatabaseService.getInstance();
    super(dbInstace as AppObject);
    this.#database = dbInstace;
  }

  static getInstance = (): DatabaseController => {
    if (!DatabaseController.instance) {
      DatabaseController.instance = new DatabaseController();
    }
    return DatabaseController.instance;
  };

  override create = async (req: Request, res: Response) => {
    try {
      const properties: AppDocument = req.body as AppDocument;
      const confirmation = await this.#database.create(properties);
      const appResponse = new AppResponse(
        confirmation,
        req,
        res,
        HttpStatusCode.Created
      );
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  override batchCreate = async (req: Request, res: Response): Promise<void> => {
    try {
      const propertyArray: Array<ObjectInfo> = req.body
        .items as Array<ObjectInfo>;
      const confirmation = await this.#database.batchCreate(propertyArray);
      const appResponse = new AppResponse(
        confirmation,
        req,
        res,
        HttpStatusCode.Created
      );
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  override read = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.body as ObjectInfo;
      const { name } = req.params;
      if (!name) throw { status: 400, message: "no collection name provided" };
      const accountInfo = await this.#database.read(id, name);
      const appResponse = new AppResponse(
        accountInfo,
        req,
        res,
        HttpStatusCode.Ok
      );
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  override list = async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.params.name;
      if (!name) throw { status: 400, message: "no collection name provided" };
      const accountsInfo = await this.#database.list(name);
      const appResponse = new AppResponse(
        accountsInfo,
        req,
        res,
        HttpStatusCode.Ok
      );
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  search = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.params;
      const { query } = req.body;
      if (!name || !query)
        throw { status: 400, message: "no collection name or query provided" };
      const searchInfo = await this.#database.search(name, query);
      const appResponse = new AppResponse(
        searchInfo,
        req,
        res,
        HttpStatusCode.Ok
      );
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  override batchRead = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.params;
      if (!name) throw { status: 400, message: "no collection name provided" };
      const body = req.body.ids as Array<ObjectInfo>;
      const accountsInfo = await this.#database.batchRead(body, name);
      const appResponse = new AppResponse(
        accountsInfo,
        req,
        res,
        HttpStatusCode.Ok
      );
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  override update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updates = req.body as ObjectInfo;
      const confirmation = await this.#database.update(updates);
      const appResponse = new AppResponse(
        confirmation,
        req,
        res,
        HttpStatusCode.Created
      );
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  upsert = async (req: Request, res: Response): Promise<void> => {
    try {
      const { upsert, identifier } = req.body;
      const confirmation = await this.#database.upsert(identifier, upsert);
      const appResponse = new AppResponse(
        confirmation,
        req,
        res,
        HttpStatusCode.Created
      );
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  override batchUpdate = async (req: Request, res: Response): Promise<void> => {
    try {
      const properties: Array<ObjectInfo> = req.body.items as Array<ObjectInfo>;
      const confirmation = await this.#database.batchUpdate(properties);
      const appResponse = new AppResponse(
        confirmation,
        req,
        res,
        HttpStatusCode.Created
      );
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  override delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.body as ObjectInfo;
      const { name } = req.params;
      if (!name) throw { status: 400, message: "no collection name provided" };
      const deleted = await this.#database.delete(id, name);
      const appResponse = new AppResponse(deleted, req, res, HttpStatusCode.Ok);
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  override batchDelete = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body.ids as Array<ObjectInfo>;
      const { name } = req.params;
      if (!name) throw { status: 400, message: "no collection name provided" };
      const deletedItems = await this.#database.batchDelete(body, name);
      const appResponse = new AppResponse(
        deletedItems,
        req,
        res,
        HttpStatusCode.Ok
      );
      appResponse.send();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.send();
    }
  };

  listen = async (
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void> => {
    try {
      const event = req.body as IEvent;
      this.#database.listen(event);
      const appResponse = new AppResponse(
        { message: "Confirmed" },
        req,
        res,
        HttpStatusCode.Accepted
      );
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };
}
