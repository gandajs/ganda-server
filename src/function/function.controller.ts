import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FunctionService } from "./function.service";
import { FunctionControllerBase } from "./base/function.controller.base";

@swagger.ApiTags("functions")
@common.Controller("functions")
export class FunctionController extends FunctionControllerBase {
  constructor(
    protected readonly service: FunctionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
