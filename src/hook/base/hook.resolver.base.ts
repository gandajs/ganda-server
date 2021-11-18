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
import { CreateHookArgs } from "./CreateHookArgs";
import { UpdateHookArgs } from "./UpdateHookArgs";
import { DeleteHookArgs } from "./DeleteHookArgs";
import { HookFindManyArgs } from "./HookFindManyArgs";
import { HookFindUniqueArgs } from "./HookFindUniqueArgs";
import { Hook } from "./Hook";
import { Entity } from "../../entity/base/Entity";
import { EntityLogic } from "../../entityLogic/base/EntityLogic";
import { Function } from "../../function/base/Function";
import { HookService } from "../hook.service";

@graphql.Resolver(() => Hook)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class HookResolverBase {
  constructor(
    protected readonly service: HookService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "read",
    possession: "any",
  })
  async _hooksMeta(
    @graphql.Args() args: HookFindManyArgs
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

  @graphql.Query(() => [Hook])
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "read",
    possession: "any",
  })
  async hooks(
    @graphql.Args() args: HookFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Hook[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Hook",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Hook, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "read",
    possession: "own",
  })
  async hook(
    @graphql.Args() args: HookFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Hook | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Hook",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Hook)
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "create",
    possession: "any",
  })
  async createHook(
    @graphql.Args() args: CreateHookArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Hook> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Hook",
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
        `providing the properties: ${properties} on ${"Hook"} creation is forbidden for roles: ${roles}`
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

        entityLogic: args.data.entityLogic
          ? {
              connect: args.data.entityLogic,
            }
          : undefined,

        function: args.data.function
          ? {
              connect: args.data.function,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Hook)
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "update",
    possession: "any",
  })
  async updateHook(
    @graphql.Args() args: UpdateHookArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Hook | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Hook",
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
        `providing the properties: ${properties} on ${"Hook"} update is forbidden for roles: ${roles}`
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

          entityLogic: args.data.entityLogic
            ? {
                connect: args.data.entityLogic,
              }
            : undefined,

          function: args.data.function
            ? {
                connect: args.data.function,
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

  @graphql.Mutation(() => Hook)
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "delete",
    possession: "any",
  })
  async deleteHook(@graphql.Args() args: DeleteHookArgs): Promise<Hook | null> {
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

  @graphql.ResolveField(() => Entity, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "read",
    possession: "any",
  })
  async entity(
    @graphql.Parent() parent: Hook,
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

  @graphql.ResolveField(() => EntityLogic, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "read",
    possession: "any",
  })
  async entityLogic(
    @graphql.Parent() parent: Hook,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EntityLogic | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EntityLogic",
    });
    const result = await this.service.getEntityLogic(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Function, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "read",
    possession: "any",
  })
  async function(
    @graphql.Parent() parent: Hook,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Function | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Function",
    });
    const result = await this.service.getFunction(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
