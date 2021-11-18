import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AuthenticatorService } from "./authenticator.service";
import { AuthenticatorControllerBase } from "./base/authenticator.controller.base";

@swagger.ApiTags("authenticators")
@common.Controller("authenticators")
export class AuthenticatorController extends AuthenticatorControllerBase {
  constructor(
    protected readonly service: AuthenticatorService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
