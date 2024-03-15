import dotenv from "dotenv";
import {
  AccountInfo,
  AppObject,
  AppEvent,
  HttpStatusCode,
} from "../../../shared/app-types";
dotenv.config();

export class AccountService extends AppObject {
  constructor(name: string, value?: any) {
    super(name, value);
  }

  listen = async (event: AppEvent): Promise<any> => {
    const eventName = event.name;
    switch (eventName) {
      case "user-unsubscribed": {
        this.delete(event.details.accountId);
        break;
      }
      default: {
        throw {
          message: "Not subscribed to this event",
          status: HttpStatusCode.NotImplemented,
        };
      }
    }
  };
}
