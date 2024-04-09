import dotenv from "dotenv";
import { AppEvent, HttpStatusCode } from "../../../shared/app-types";
import { HttpClient } from "../../../shared";
dotenv.config();

export class GptService {
  constructor() {}

  chat = async (messages: Array<any>, model: string = "gpt-3.5-turbo-0125") => {
    const completion = await HttpClient.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model,
        messages,
      },
      {
        Authorization: `Bearer ${process.env.API_KEY}`,
      }
    );
    console.log(completion);
    return completion;
  };

  listen = async (event: AppEvent): Promise<any> => {
    const eventName = event.name;
    switch (eventName) {
      default: {
        throw {
          message: "Not subscribed to this event",
          status: HttpStatusCode.NotImplemented,
        };
      }
    }
  };
}
