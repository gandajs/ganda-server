import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { IntegrationResolverBase } from "./base/integration.resolver.base";
import { Integration } from "./base/Integration";
import { IntegrationService } from "./integration.service";

@graphql.Resolver(() => Integration)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class IntegrationResolver extends IntegrationResolverBase {
  constructor(
    protected readonly service: IntegrationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
