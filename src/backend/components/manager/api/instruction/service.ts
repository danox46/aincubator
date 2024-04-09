import dotenv from "dotenv";
import { AppEvent, HttpStatusCode } from "../../../shared/app-types";
import { HttpClient, ServiceHandler } from "../../../shared";
import { Employee } from "../../../shared/app-types/employee";
dotenv.config();

export class InstructionService {
  constructor() {}

  startProject = async (
    projectPrameters = {
      mainIdea: "A chain restaurat with a simple cheap and convenient menu",
    }
  ) => {
    //start role definition
    const ceo = new Employee("ceo");
    const cto = new Employee("cto");
    const coo = new Employee("coo");
    const cfo = new Employee("cfo");
    const cmo = new Employee("cmo");
    const cso = new Employee("cso");
    const cpo = new Employee("cpo");

    const staff: Record<string, Employee> = {
      ceo,
      cto,
      coo,
      cfo,
      cmo,
      cso,
      cpo,
    };

    for (const member in staff) {
      if (Object.prototype.hasOwnProperty.call(staff, member)) {
        const current = staff[member];
        const deliverables = await current.do(staff, projectPrameters);
        await Promise.all(
          deliverables.map(
            async (data) =>
              await ServiceHandler.post("/database/create", "database", {
                name: "deliverable",
                data,
              })
          )
        );
      }
    }
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
