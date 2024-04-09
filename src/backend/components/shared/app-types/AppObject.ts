import { AppEvent, ServiceHandler } from "../service-handler";
import { z } from "zod";

export const ObjectInfo = z.record(z.string(), z.any());
export type ObjectInfo = z.infer<typeof ObjectInfo>;

export const AppId = z.string().min(1);
export type AppId = z.infer<typeof AppId>;

export const AppRecord = z.record(z.string(), z.any());
export type AppRecord = z.infer<typeof AppRecord>;

export interface IObjectInfo extends Record<string, any> {
  name?: string;
  _id?: any;
}

export abstract class AppObject extends Object {
  name: string;
  schema: any;
  constructor(name: string, schema: any, value: any = undefined) {
    super(value);
    this.schema = schema;
    this.name = name;
  }

  create = async (
    properties: ObjectInfo,
    ...args: Array<any>
  ): Promise<any> => {
    const record = await ServiceHandler.post("/database/create/", "database", {
      properties,
      name: this.name,
    });
    return record;
  };

  batchCreate = async (
    objects: Array<ObjectInfo>,
    ...args: Array<any>
  ): Promise<any> => {
    const name = this.name;
    objects = objects.map((e) => {
      return { name, properties: e.properties };
    });
    const confirmation = await ServiceHandler.post(
      "/database/create/batch",
      "database",
      objects
    );
    return confirmation;
  };

  read = async (id: any, ...args: Array<any>): Promise<any> => {
    const confirmation = await ServiceHandler.post(
      "/database/read/" + this.name,
      "database",
      { id }
    );
    return confirmation;
  };

  list = async (...args: Array<any>): Promise<any> => {
    const result = await ServiceHandler.get(
      "/database/list/" + this.name,
      "database"
    );
    return result;
  };

  batchRead = async (ids: Array<string>, ...args: Array<any>): Promise<any> => {
    const batch = await ServiceHandler.post(
      "/database/read/batch/" + this.name,
      "database",
      { ids }
    );
    return batch;
  };

  update = async (update: ObjectInfo, ...args: Array<any>): Promise<any> => {
    const confirmation = await ServiceHandler.patch(
      "/database/update",
      "database",
      update
    );
    return confirmation;
  };

  batchUpdate = async (
    batch: Array<ObjectInfo>,
    ...args: Array<any>
  ): Promise<any> => {
    const name = this.name;
    batch = batch.map((e) => {
      return { name, ...e };
    });
    const results: Array<Promise<any>> = [];
    const result = ServiceHandler.patch(
      "/database/update/batch",
      "database",
      batch
    );
    results.push(result);

    return await Promise.all(results);
  };

  delete = async (id: string, ...args: Array<any>): Promise<any> => {
    const result = await ServiceHandler.delete(
      "/database/delete/" + this.name,
      "database",
      { id }
    );
    return result;
  };

  batchDelete = async (
    ids: Array<string>,
    ...args: Array<any>
  ): Promise<any> => {
    const batch = await ServiceHandler.delete(
      "/database/delete/batch/" + this.name,
      "database",
      { ids }
    );
    return batch;
  };

  abstract listen(event: AppEvent, ...args: Array<any>): Promise<any>;
}
