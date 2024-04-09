import { InstructionService } from "./manager/api/instruction/service";

const service = new InstructionService();

const main = async () => {
  await service.startProject();
};

main();
