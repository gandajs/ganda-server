import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { NavigationServiceBase } from "./base/navigation.service.base";

@Injectable()
export class NavigationService extends NavigationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
