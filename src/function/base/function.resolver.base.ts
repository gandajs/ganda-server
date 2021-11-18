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
import { CreateFunctionArgs } from "./CreateFunctionArgs";
import { UpdateFunctionArgs } from "./UpdateFunctionArgs";
import { DeleteFunctionArgs } from "./DeleteFunctionArgs";
import { FunctionFindManyArgs } from "./FunctionFindManyArgs";
import { FunctionFindUniqueArgs } from "./FunctionFindUniqueArgs";
import { Function } from "./Function";
import { HookFindManyArgs } from "../../hook/base/HookFindManyArgs";
import { Hook } from "../../hook/base/Hook";
import { FunctionService } from "../function.service";

@graphql.Resolver(() => Function)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class FunctionResolverBase {
  constructor(
    protected readonly service: FunctionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Function",
    action: "read",
    possession: "any",
  })
  async _functionsMeta(
    @graphql.Args() args: FunctionFindManyArgs
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

  @graphql.Query(() => [Function])
  @nestAccessControl.UseRoles({
    resource: "Function",
    action: "read",
    possession: "any",
  })
  async functions(
    @graphql.Args() args: FunctionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Function[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Function",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Function, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Function",
    action: "read",
    possession: "own",
  })
  async function(
    @graphql.Args() args: FunctionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Function | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Function",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Function)
  @nestAccessControl.UseRoles({
    resource: "Function",
    action: "create",
    possession: "any",
  })
  async createFunction(
    @graphql.Args() args: CreateFunctionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Function> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Function",
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
        `providing the properties: ${properties} on ${"Function"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Function)
  @nestAccessControl.UseRoles({
    resource: "Function",
    action: "update",
    possession: "any",
  })
  async updateFunction(
    @graphql.Args() args: UpdateFunctionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Function | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Function",
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
        `providing the properties: ${properties} on ${"Function"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Function)
  @nestAccessControl.UseRoles({
    resource: "Function",
    action: "delete",
    possession: "any",
  })
  async deleteFunction(
    @graphql.Args() args: DeleteFunctionArgs
  ): Promise<Function | null> {
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
    resource: "Function",
    action: "read",
    possession: "any",
  })
  async hooks(
    @graphql.Parent() parent: Function,
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
}
