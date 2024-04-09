import { InstructionService } from "./service";
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
  #gpt: InstructionService;
  private constructor() {
    const accountService = new InstructionService();
    this.#gpt = accountService;
  }

  static getInstance = (): GptController => {
    if (!GptController.instance) {
      GptController.instance = new GptController();
    }
    return GptController.instance;
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
