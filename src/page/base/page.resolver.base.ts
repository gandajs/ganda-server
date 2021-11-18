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
import { CreatePageArgs } from "./CreatePageArgs";
import { UpdatePageArgs } from "./UpdatePageArgs";
import { DeletePageArgs } from "./DeletePageArgs";
import { PageFindManyArgs } from "./PageFindManyArgs";
import { PageFindUniqueArgs } from "./PageFindUniqueArgs";
import { Page } from "./Page";
import { NavigationFindManyArgs } from "../../navigation/base/NavigationFindManyArgs";
import { Navigation } from "../../navigation/base/Navigation";
import { PageService } from "../page.service";

@graphql.Resolver(() => Page)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class PageResolverBase {
  constructor(
    protected readonly service: PageService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Page",
    action: "read",
    possession: "any",
  })
  async _pagesMeta(
    @graphql.Args() args: PageFindManyArgs
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

  @graphql.Query(() => [Page])
  @nestAccessControl.UseRoles({
    resource: "Page",
    action: "read",
    possession: "any",
  })
  async pages(
    @graphql.Args() args: PageFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Page[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Page",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Page, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Page",
    action: "read",
    possession: "own",
  })
  async page(
    @graphql.Args() args: PageFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Page | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Page",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Page)
  @nestAccessControl.UseRoles({
    resource: "Page",
    action: "create",
    possession: "any",
  })
  async createPage(
    @graphql.Args() args: CreatePageArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Page> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Page",
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
        `providing the properties: ${properties} on ${"Page"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Page)
  @nestAccessControl.UseRoles({
    resource: "Page",
    action: "update",
    possession: "any",
  })
  async updatePage(
    @graphql.Args() args: UpdatePageArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Page | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Page",
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
        `providing the properties: ${properties} on ${"Page"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Page)
  @nestAccessControl.UseRoles({
    resource: "Page",
    action: "delete",
    possession: "any",
  })
  async deletePage(@graphql.Args() args: DeletePageArgs): Promise<Page | null> {
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
    resource: "Page",
    action: "read",
    possession: "any",
  })
  async navigations(
    @graphql.Parent() parent: Page,
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
}
