import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { NavigationService } from "./navigation.service";
import { NavigationControllerBase } from "./base/navigation.controller.base";

@swagger.ApiTags("navigations")
@common.Controller("navigations")
export class NavigationController extends NavigationControllerBase {
  constructor(
    protected readonly service: NavigationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
