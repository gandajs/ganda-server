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
import { CreateEntityLogicArgs } from "./CreateEntityLogicArgs";
import { UpdateEntityLogicArgs } from "./UpdateEntityLogicArgs";
import { DeleteEntityLogicArgs } from "./DeleteEntityLogicArgs";
import { EntityLogicFindManyArgs } from "./EntityLogicFindManyArgs";
import { EntityLogicFindUniqueArgs } from "./EntityLogicFindUniqueArgs";
import { EntityLogic } from "./EntityLogic";
import { HookFindManyArgs } from "../../hook/base/HookFindManyArgs";
import { Hook } from "../../hook/base/Hook";
import { Entity } from "../../entity/base/Entity";
import { EntityLogicService } from "../entityLogic.service";

@graphql.Resolver(() => EntityLogic)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class EntityLogicResolverBase {
  constructor(
    protected readonly service: EntityLogicService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "EntityLogic",
    action: "read",
    possession: "any",
  })
  async _entitiesLogicMeta(
    @graphql.Args() args: EntityLogicFindManyArgs
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

  @graphql.Query(() => [EntityLogic])
  @nestAccessControl.UseRoles({
    resource: "EntityLogic",
    action: "read",
    possession: "any",
  })
  async entitiesLogic(
    @graphql.Args() args: EntityLogicFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EntityLogic[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EntityLogic",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => EntityLogic, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "EntityLogic",
    action: "read",
    possession: "own",
  })
  async entityLogic(
    @graphql.Args() args: EntityLogicFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EntityLogic | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "EntityLogic",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => EntityLogic)
  @nestAccessControl.UseRoles({
    resource: "EntityLogic",
    action: "create",
    possession: "any",
  })
  async createEntityLogic(
    @graphql.Args() args: CreateEntityLogicArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EntityLogic> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "EntityLogic",
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
        `providing the properties: ${properties} on ${"EntityLogic"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        entity: args.data.entity
          ? {
              connect: args.data.entity,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => EntityLogic)
  @nestAccessControl.UseRoles({
    resource: "EntityLogic",
    action: "update",
    possession: "any",
  })
  async updateEntityLogic(
    @graphql.Args() args: UpdateEntityLogicArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EntityLogic | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EntityLogic",
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
        `providing the properties: ${properties} on ${"EntityLogic"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          entity: args.data.entity
            ? {
                connect: args.data.entity,
              }
            : undefined,
        },
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

  @graphql.Mutation(() => EntityLogic)
  @nestAccessControl.UseRoles({
    resource: "EntityLogic",
    action: "delete",
    possession: "any",
  })
  async deleteEntityLogic(
    @graphql.Args() args: DeleteEntityLogicArgs
  ): Promise<EntityLogic | null> {
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

  @graphql.ResolveField(() => [Hook])
  @nestAccessControl.UseRoles({
    resource: "EntityLogic",
    action: "read",
    possession: "any",
  })
  async hooks(
    @graphql.Parent() parent: EntityLogic,
    @graphql.Args() args: HookFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Hook[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Hook",
    });
    const results = await this.service.findHooks(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Entity, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "EntityLogic",
    action: "read",
    possession: "any",
  })
  async entity(
    @graphql.Parent() parent: EntityLogic,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Entity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Entity",
    });
    const result = await this.service.getEntity(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
