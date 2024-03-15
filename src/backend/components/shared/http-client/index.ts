import axios, {
  AxiosResponse as HttpResponse,
  AxiosRequestConfig,
  HttpStatusCode,
} from "axios";
import { AppClient } from "../app-types/network";
import shareConfig from "../config";

export { HttpStatusCode, HttpResponse };

export class HttpClient implements AppClient {
  private static retry = async (
    config: AxiosRequestConfig,
    retriesLeft: number = shareConfig.maxRetries,
    interval: number = shareConfig.retryInterval
  ): Promise<any> => {
    try {
      const response: HttpResponse = await axios(config);
      return response.data;
    } catch (error) {
      if (retriesLeft > 0) {
        console.log("error:", error);
        await new Promise((resolve) => setTimeout(resolve, interval));
        return HttpClient.retry(config, retriesLeft - 1, interval * 2);
      }
      throw error;
    }
  };

  static get = async (
    url: string,
    headers?: any,
    ...args: Array<any>
  ): Promise<any> => {
    const response = await HttpClient.retry({
      method: "get",
      url,
      headers,
    });
    return response;
  };

  static post = async (
    url: string,
    data: any,
    headers?: any,
    ...args: Array<any>
  ): Promise<any> => {
    const response = await HttpClient.retry({
      method: "post",
      url,
      data,
      headers,
    });
    return response;
  };

  static patch = async (
    url: string,
    data: any,
    headers?: any,
    ...args: Array<any>
  ): Promise<any> => {
    const response = await HttpClient.retry({
      method: "patch",
      url,
      data,
      headers,
    });
    return response;
  };

  static delete = async (
    url: string,
    data?: any,
    headers?: any,
    ...args: Array<any>
  ): Promise<any> => {
    const response = await HttpClient.retry({
      method: "delete",
      url,
      data,
      headers,
    });
    return response;
  };

  static put = async (
    url: string,
    data: any,
    headers?: any,
    ...args: Array<any>
  ): Promise<any> => {
    const response = await HttpClient.retry({
      method: "put",
      url,
      data,
      headers,
    });
    return response;
  };
}
