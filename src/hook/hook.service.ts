import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { HookServiceBase } from "./base/hook.service.base";

@Injectable()
export class HookService extends HookServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
