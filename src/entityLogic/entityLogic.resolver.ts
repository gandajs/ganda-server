import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { EntityLogicResolverBase } from "./base/entityLogic.resolver.base";
import { EntityLogic } from "./base/EntityLogic";
import { EntityLogicService } from "./entityLogic.service";

@graphql.Resolver(() => EntityLogic)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class EntityLogicResolver extends EntityLogicResolverBase {
  constructor(
    protected readonly service: EntityLogicService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
