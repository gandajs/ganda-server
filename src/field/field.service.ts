import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { FieldServiceBase } from "./base/field.service.base";

@Injectable()
export class FieldService extends FieldServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
