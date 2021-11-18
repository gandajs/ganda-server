import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FieldService } from "./field.service";
import { FieldControllerBase } from "./base/field.controller.base";

@swagger.ApiTags("fields")
@common.Controller("fields")
export class FieldController extends FieldControllerBase {
  constructor(
    protected readonly service: FieldService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
