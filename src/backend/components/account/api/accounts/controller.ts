import { AccountService } from "./service";
import {
  AppObjectController,
  AppResponse,
  AppError,
  HttpStatusCode,
  Request,
  Response,
  AppEvent,
} from "../../../shared/app-types";

export class AccountController extends AppObjectController {
  private static instance: AccountController | null = null;
  #account: AccountService;
  private constructor() {
    const accountSchema = { accountName: "string" };
    const accountService = new AccountService("account", accountSchema);
    super(accountService);
    this.#account = accountService;
  }

  static getInstance = (): AccountController => {
    if (!AccountController.instance) {
      AccountController.instance = new AccountController();
    }
    return AccountController.instance;
  };

  listen = async (req: Request, res: Response): Promise<void> => {
    try {
      const event: AppEvent = AppEvent.passthrough().parse(req.body);
      await this.#account.listen(event);
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
