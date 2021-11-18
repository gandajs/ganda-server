import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { AuthenticatorServiceBase } from "./base/authenticator.service.base";

@Injectable()
export class AuthenticatorService extends AuthenticatorServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
