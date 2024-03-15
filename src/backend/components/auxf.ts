import { ServiceHandler } from "./shared/service-handler";

ServiceHandler.subscribeToEvent({
  serivce: "account",
  eventName: "user-unsubscribed",
});
