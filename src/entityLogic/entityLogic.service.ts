import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { EntityLogicServiceBase } from "./base/entityLogic.service.base";

@Injectable()
export class EntityLogicService extends EntityLogicServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
