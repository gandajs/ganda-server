import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { FunctionServiceBase } from "./base/function.service.base";

@Injectable()
export class FunctionService extends FunctionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
