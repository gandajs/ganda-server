import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EntityLogicService } from "./entityLogic.service";
import { EntityLogicControllerBase } from "./base/entityLogic.controller.base";

@swagger.ApiTags("entity-logics")
@common.Controller("entity-logics")
export class EntityLogicController extends EntityLogicControllerBase {
  constructor(
    protected readonly service: EntityLogicService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
