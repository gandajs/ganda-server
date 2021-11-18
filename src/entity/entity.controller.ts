import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EntityService } from "./entity.service";
import { EntityControllerBase } from "./base/entity.controller.base";

@swagger.ApiTags("entities")
@common.Controller("entities")
export class EntityController extends EntityControllerBase {
  constructor(
    protected readonly service: EntityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
