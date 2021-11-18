import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { EntityServiceBase } from "./base/entity.service.base";

@Injectable()
export class EntityService extends EntityServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
