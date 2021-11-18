import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { NavigationResolverBase } from "./base/navigation.resolver.base";
import { Navigation } from "./base/Navigation";
import { NavigationService } from "./navigation.service";

@graphql.Resolver(() => Navigation)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class NavigationResolver extends NavigationResolverBase {
  constructor(
    protected readonly service: NavigationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
