import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateWebhookArgs } from "./CreateWebhookArgs";
import { UpdateWebhookArgs } from "./UpdateWebhookArgs";
import { DeleteWebhookArgs } from "./DeleteWebhookArgs";
import { WebhookFindManyArgs } from "./WebhookFindManyArgs";
import { WebhookFindUniqueArgs } from "./WebhookFindUniqueArgs";
import { Webhook } from "./Webhook";
import { WebhookService } from "../webhook.service";

@graphql.Resolver(() => Webhook)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class WebhookResolverBase {
  constructor(
    protected readonly service: WebhookService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Webhook",
    action: "read",
    possession: "any",
  })
  async _webhooksMeta(
    @graphql.Args() args: WebhookFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Webhook])
  @nestAccessControl.UseRoles({
    resource: "Webhook",
    action: "read",
    possession: "any",
  })
  async webhooks(
    @graphql.Args() args: WebhookFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Webhook[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Webhook",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Webhook, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Webhook",
    action: "read",
    possession: "own",
  })
  async webhook(
    @graphql.Args() args: WebhookFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Webhook | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Webhook",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Webhook)
  @nestAccessControl.UseRoles({
    resource: "Webhook",
    action: "create",
    possession: "any",
  })
  async createWebhook(
    @graphql.Args() args: CreateWebhookArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Webhook> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Webhook",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Webhook"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Webhook)
  @nestAccessControl.UseRoles({
    resource: "Webhook",
    action: "update",
    possession: "any",
  })
  async updateWebhook(
    @graphql.Args() args: UpdateWebhookArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Webhook | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Webhook",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Webhook"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Webhook)
  @nestAccessControl.UseRoles({
    resource: "Webhook",
    action: "delete",
    possession: "any",
  })
  async deleteWebhook(
    @graphql.Args() args: DeleteWebhookArgs
  ): Promise<Webhook | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
