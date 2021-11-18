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
import { CreateIntegrationArgs } from "./CreateIntegrationArgs";
import { UpdateIntegrationArgs } from "./UpdateIntegrationArgs";
import { DeleteIntegrationArgs } from "./DeleteIntegrationArgs";
import { IntegrationFindManyArgs } from "./IntegrationFindManyArgs";
import { IntegrationFindUniqueArgs } from "./IntegrationFindUniqueArgs";
import { Integration } from "./Integration";
import { IntegrationService } from "../integration.service";

@graphql.Resolver(() => Integration)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class IntegrationResolverBase {
  constructor(
    protected readonly service: IntegrationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Integration",
    action: "read",
    possession: "any",
  })
  async _integrationsMeta(
    @graphql.Args() args: IntegrationFindManyArgs
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

  @graphql.Query(() => [Integration])
  @nestAccessControl.UseRoles({
    resource: "Integration",
    action: "read",
    possession: "any",
  })
  async integrations(
    @graphql.Args() args: IntegrationFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Integration[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Integration",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Integration, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Integration",
    action: "read",
    possession: "own",
  })
  async integration(
    @graphql.Args() args: IntegrationFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Integration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Integration",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Integration)
  @nestAccessControl.UseRoles({
    resource: "Integration",
    action: "create",
    possession: "any",
  })
  async createIntegration(
    @graphql.Args() args: CreateIntegrationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Integration> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Integration",
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
        `providing the properties: ${properties} on ${"Integration"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Integration)
  @nestAccessControl.UseRoles({
    resource: "Integration",
    action: "update",
    possession: "any",
  })
  async updateIntegration(
    @graphql.Args() args: UpdateIntegrationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Integration | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Integration",
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
        `providing the properties: ${properties} on ${"Integration"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Integration)
  @nestAccessControl.UseRoles({
    resource: "Integration",
    action: "delete",
    possession: "any",
  })
  async deleteIntegration(
    @graphql.Args() args: DeleteIntegrationArgs
  ): Promise<Integration | null> {
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
