import dotenv from "dotenv";
import { HttpClient } from "../http-client";
import { Confirmation } from "../app-types/network";
import { z } from "zod";
dotenv.config();

type ServiceName = "database" | "account";

type AppServiceInfo = {
  [K in ServiceName]: { port: number };
};

const servicesInfo: AppServiceInfo = {
  database: {
    port: 3000,
  },
  account: {
    port: 3001,
  },
};

export type ListedEvent = "user-unsubscribed";

export const AppEvent = z.object({
  source: z.string(),
  name: z.string().min(1),
  details: z.record(z.string(), z.any()),
});

export type AppEvent = z.infer<typeof AppEvent>;

export interface IEvent {
  source: string;
  name: string;
  details: any;
}

interface IEventSubscription {
  name?: string;
  serivce: ServiceName;
  eventName: ListedEvent;
  subscriptionId?: string;
}

export class ServiceHandler extends HttpClient {
  static get = async (
    endpoint: string,
    serviceName: ServiceName
  ): Promise<Confirmation> => {
    const url = ServiceHandler.getServiceUrl(serviceName);
    const result = await super.get(url + endpoint);
    return result;
  };

  static post = async (
    endpoint: string,
    serviceName: ServiceName,
    data: any
  ): Promise<Confirmation> => {
    const url = ServiceHandler.getServiceUrl(serviceName);
    data = ServiceHandler.setData(data);
    const result = await super.post(url + endpoint, data);
    return result;
  };

  static async patch(
    endpoint: string,
    serviceName: ServiceName,
    update: any
  ): Promise<Confirmation> {
    const url = ServiceHandler.getServiceUrl(serviceName);
    update = ServiceHandler.setData(update);
    const result = await super.patch(url + endpoint, update);
    return result;
  }

  static async delete(
    endpoint: string,
    serviceName: ServiceName,
    ids: any | Array<any>
  ): Promise<Confirmation> {
    const url = ServiceHandler.getServiceUrl(serviceName);
    ids = ServiceHandler.setData(ids);
    const result = await super.delete(url + endpoint, ids);
    return result;
  }

  static put = async (
    endpoint: string,
    serviceName: ServiceName,
    update: any
  ): Promise<Confirmation> => {
    const url = ServiceHandler.getServiceUrl(serviceName);
    update = ServiceHandler.setData(update);
    const result = await super.put(url + endpoint, update);
    return result;
  };

  static event = async (event: IEvent) => {
    const subscribers: Confirmation = await ServiceHandler.post(
      "/database/search/event-subscription",
      "database",
      {
        query: { eventName: event.name },
      }
    );

    if (!subscribers?.results) return;

    const postPromises = subscribers.results.map((e) => {
      return ServiceHandler.post("/" + e.serivce + "/event", e.serivce, event);
    });
    return await Promise.all(postPromises);
  };

  static subscribeToEvent = async (subscription: IEventSubscription) => {
    subscription.name = "event-subscription";
    subscription.subscriptionId =
      subscription.eventName + "-to-" + subscription.serivce;
    ServiceHandler.put("/database/upsert", "database", {
      upsert: subscription,
      identifier: "subscriptionId",
    });
  };

  private static getServiceUrl = (serviceName: ServiceName) => {
    const env = process.env.ENV;
    return env === "prod" || env === "dev"
      ? `https://${serviceName}-dot-nutrition-app-410700.uc.r.appspot.com/`
      : `http://localhost:${servicesInfo[serviceName].port}`;
  };

  private static setData = (data: any) => {
    data = typeof data === "string" ? JSON.parse(data) : data;
    data = Array.isArray(data) ? { items: data } : data;
    return data;
  };
}
