import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PageService } from "./page.service";
import { PageControllerBase } from "./base/page.controller.base";

@swagger.ApiTags("pages")
@common.Controller("pages")
export class PageController extends PageControllerBase {
  constructor(
    protected readonly service: PageService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
