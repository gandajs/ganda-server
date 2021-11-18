import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { HookService } from "./hook.service";
import { HookControllerBase } from "./base/hook.controller.base";

@swagger.ApiTags("hooks")
@common.Controller("hooks")
export class HookController extends HookControllerBase {
  constructor(
    protected readonly service: HookService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
