import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { IntegrationService } from "./integration.service";
import { IntegrationControllerBase } from "./base/integration.controller.base";

@swagger.ApiTags("integrations")
@common.Controller("integrations")
export class IntegrationController extends IntegrationControllerBase {
  constructor(
    protected readonly service: IntegrationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
