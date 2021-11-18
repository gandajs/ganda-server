import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { WebhookResolverBase } from "./base/webhook.resolver.base";
import { Webhook } from "./base/Webhook";
import { WebhookService } from "./webhook.service";

@graphql.Resolver(() => Webhook)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class WebhookResolver extends WebhookResolverBase {
  constructor(
    protected readonly service: WebhookService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
