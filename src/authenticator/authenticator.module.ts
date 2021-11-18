import { Module } from "@nestjs/common";
import { AuthenticatorModuleBase } from "./base/authenticator.module.base";
import { AuthenticatorService } from "./authenticator.service";
import { AuthenticatorController } from "./authenticator.controller";
import { AuthenticatorResolver } from "./authenticator.resolver";

@Module({
  imports: [AuthenticatorModuleBase],
  controllers: [AuthenticatorController],
  providers: [AuthenticatorService, AuthenticatorResolver],
  exports: [AuthenticatorService],
})
export class AuthenticatorModule {}
