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
import { CreateNavigationArgs } from "./CreateNavigationArgs";
import { UpdateNavigationArgs } from "./UpdateNavigationArgs";
import { DeleteNavigationArgs } from "./DeleteNavigationArgs";
import { NavigationFindManyArgs } from "./NavigationFindManyArgs";
import { NavigationFindUniqueArgs } from "./NavigationFindUniqueArgs";
import { Navigation } from "./Navigation";
import { Page } from "../../page/base/Page";
import { NavigationService } from "../navigation.service";

@graphql.Resolver(() => Navigation)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class NavigationResolverBase {
  constructor(
    protected readonly service: NavigationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "read",
    possession: "any",
  })
  async _navigationsMeta(
    @graphql.Args() args: NavigationFindManyArgs
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

  @graphql.Query(() => [Navigation])
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "read",
    possession: "any",
  })
  async navigations(
    @graphql.Args() args: NavigationFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Navigation[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Navigation",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Navigation, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "read",
    possession: "own",
  })
  async navigation(
    @graphql.Args() args: NavigationFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Navigation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Navigation",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Navigation)
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "create",
    possession: "any",
  })
  async createNavigation(
    @graphql.Args() args: CreateNavigationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Navigation> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Navigation",
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
        `providing the properties: ${properties} on ${"Navigation"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        page: args.data.page
          ? {
              connect: args.data.page,
            }
          : undefined,

        parent: args.data.parent
          ? {
              connect: args.data.parent,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Navigation)
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "update",
    possession: "any",
  })
  async updateNavigation(
    @graphql.Args() args: UpdateNavigationArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Navigation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Navigation",
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
        `providing the properties: ${properties} on ${"Navigation"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          page: args.data.page
            ? {
                connect: args.data.page,
              }
            : undefined,

          parent: args.data.parent
            ? {
                connect: args.data.parent,
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

  @graphql.Mutation(() => Navigation)
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "delete",
    possession: "any",
  })
  async deleteNavigation(
    @graphql.Args() args: DeleteNavigationArgs
  ): Promise<Navigation | null> {
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

  @graphql.ResolveField(() => [Navigation])
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "read",
    possession: "any",
  })
  async navigations(
    @graphql.Parent() parent: Navigation,
    @graphql.Args() args: NavigationFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Navigation[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Navigation",
    });
    const results = await this.service.findNavigations(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Page, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "read",
    possession: "any",
  })
  async page(
    @graphql.Parent() parent: Navigation,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Page | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Page",
    });
    const result = await this.service.getPage(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Navigation, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "read",
    possession: "any",
  })
  async parent(
    @graphql.Parent() parent: Navigation,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Navigation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Navigation",
    });
    const result = await this.service.getParent(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
