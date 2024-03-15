import { AuthService } from "./service";
import {
  AppObjectController,
  AppResponse,
  AppError,
  HttpStatusCode,
  Request,
  Response,
  AppObject,
  Credentials,
  AccountInfo,
  AppId,
  UserPolicy,
  AppEvent,
} from "../../../shared/app-types";

export class AuthController extends AppObjectController {
  private static instance: AuthController | null = null;
  #auth: AuthService;
  private constructor() {
    const dbInstace = AuthService.getInstance();
    super(dbInstace as AppObject);
    this.#auth = dbInstace;
  }

  static getInstance = (): AuthController => {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  };

  subscribe = async (req: Request, res: Response) => {
    try {
      const credentials: Credentials = Credentials.parse(req.body.credentials);
      const accountInfo: AccountInfo = AccountInfo.parse(req.body.accountInfo);
      const confirmation = await this.#auth.subscribe(credentials, accountInfo);
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

  unsubscribe = async (req: Request, res: Response) => {
    try {
      const accountId: AppId = AppId.parse(req.body.accountId);
      const confirmation = await this.#auth.unsubscribe(accountId);
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

  authenticate = async (req: Request, res: Response) => {
    try {
      const credentials: Credentials = Credentials.parse(req.body.credentials);
      const confirmation = await this.#auth.authenticate(credentials);
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

  getUserPolicy = async (req: Request, res: Response) => {
    try {
      const accountId: AppId = AppId.parse(req.params.accountId);
      const confirmation = await this.#auth.getUserPolicy(accountId);
      const appResponse = new AppResponse(
        confirmation,
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

  setUserPolicy = async (req: Request, res: Response) => {
    try {
      const accountId: AppId = AppId.parse(req.params.accountId);
      const userPolicy: UserPolicy = UserPolicy.parse(req.body.userPolicy);
      const confirmation = await this.#auth.setUserPolicy(
        accountId,
        userPolicy
      );
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

  listen = async (
    req: Request,
    res: Response,
    ...args: Array<any>
  ): Promise<void> => {
    try {
      const event: AppEvent = AppEvent.parse(req.body);
      this.#auth.listen(event);
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

  override create = async (req: Request, res: Response): Promise<void> => {
    const appError = new AppError(
      { message: "This is a private method", status: HttpStatusCode.Forbidden },
      req,
      res
    );
    appError.send();
  };

  override batchCreate = async (req: Request, res: Response): Promise<void> => {
    const appError = new AppError(
      { message: "This is a private method", status: HttpStatusCode.Forbidden },
      req,
      res
    );
    appError.send();
  };

  override read = async (req: Request, res: Response): Promise<void> => {
    const appError = new AppError(
      { message: "This is a private method", status: HttpStatusCode.Forbidden },
      req,
      res
    );
    appError.send();
  };

  override list = async (req: Request, res: Response): Promise<void> => {
    const appError = new AppError(
      { message: "This is a private method", status: HttpStatusCode.Forbidden },
      req,
      res
    );
    appError.send();
  };

  override batchRead = async (req: Request, res: Response): Promise<void> => {
    const appError = new AppError(
      { message: "This is a private method", status: HttpStatusCode.Forbidden },
      req,
      res
    );
    appError.send();
  };

  override update = async (req: Request, res: Response): Promise<void> => {
    const appError = new AppError(
      { message: "This is a private method", status: HttpStatusCode.Forbidden },
      req,
      res
    );
    appError.send();
  };

  override batchUpdate = async (req: Request, res: Response): Promise<void> => {
    const appError = new AppError(
      { message: "This is a private method", status: HttpStatusCode.Forbidden },
      req,
      res
    );
    appError.send();
  };

  override delete = async (req: Request, res: Response): Promise<void> => {
    const appError = new AppError(
      { message: "This is a private method", status: HttpStatusCode.Forbidden },
      req,
      res
    );
    appError.send();
  };

  override batchDelete = async (req: Request, res: Response): Promise<void> => {
    const appError = new AppError(
      { message: "This is a private method", status: HttpStatusCode.Forbidden },
      req,
      res
    );
    appError.send();
  };
}
