import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { AuthenticatorResolverBase } from "./base/authenticator.resolver.base";
import { Authenticator } from "./base/Authenticator";
import { AuthenticatorService } from "./authenticator.service";

@graphql.Resolver(() => Authenticator)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class AuthenticatorResolver extends AuthenticatorResolverBase {
  constructor(
    protected readonly service: AuthenticatorService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
