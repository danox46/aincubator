import { GptService } from "./service";
import {
  AppResponse,
  AppError,
  HttpStatusCode,
  Request,
  Response,
  AppEvent,
} from "../../../shared/app-types";

export class GptController {
  private static instance: GptController | null = null;
  #gpt: GptService;
  private constructor() {
    const accountService = new GptService();
    this.#gpt = accountService;
  }

  static getInstance = (): GptController => {
    if (!GptController.instance) {
      GptController.instance = new GptController();
    }
    return GptController.instance;
  };

  chat = async (req: Request, res: Response): Promise<void> => {
    try {
      const { messages } = req.body;
      if (!messages) throw { message: "missing messages", status: 400 };
      const result = await this.#gpt.chat(messages);
      const appResponse = new AppResponse(result, req, res, 200);
      appResponse.end();
    } catch (error) {
      const appError = new AppError(error, req, res);
      appError.end();
    }
  };

  listen = async (req: Request, res: Response): Promise<void> => {
    try {
      const event: AppEvent = AppEvent.passthrough().parse(req.body);
      await this.#gpt.listen(event);
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
