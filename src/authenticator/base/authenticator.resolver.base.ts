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
import { CreateAuthenticatorArgs } from "./CreateAuthenticatorArgs";
import { UpdateAuthenticatorArgs } from "./UpdateAuthenticatorArgs";
import { DeleteAuthenticatorArgs } from "./DeleteAuthenticatorArgs";
import { AuthenticatorFindManyArgs } from "./AuthenticatorFindManyArgs";
import { AuthenticatorFindUniqueArgs } from "./AuthenticatorFindUniqueArgs";
import { Authenticator } from "./Authenticator";
import { AuthenticatorService } from "../authenticator.service";

@graphql.Resolver(() => Authenticator)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class AuthenticatorResolverBase {
  constructor(
    protected readonly service: AuthenticatorService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Authenticator",
    action: "read",
    possession: "any",
  })
  async _authenticatorsMeta(
    @graphql.Args() args: AuthenticatorFindManyArgs
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

  @graphql.Query(() => [Authenticator])
  @nestAccessControl.UseRoles({
    resource: "Authenticator",
    action: "read",
    possession: "any",
  })
  async authenticators(
    @graphql.Args() args: AuthenticatorFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Authenticator[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Authenticator",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Authenticator, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Authenticator",
    action: "read",
    possession: "own",
  })
  async authenticator(
    @graphql.Args() args: AuthenticatorFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Authenticator | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Authenticator",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Authenticator)
  @nestAccessControl.UseRoles({
    resource: "Authenticator",
    action: "create",
    possession: "any",
  })
  async createAuthenticator(
    @graphql.Args() args: CreateAuthenticatorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Authenticator> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Authenticator",
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
        `providing the properties: ${properties} on ${"Authenticator"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Authenticator)
  @nestAccessControl.UseRoles({
    resource: "Authenticator",
    action: "update",
    possession: "any",
  })
  async updateAuthenticator(
    @graphql.Args() args: UpdateAuthenticatorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Authenticator | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Authenticator",
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
        `providing the properties: ${properties} on ${"Authenticator"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Authenticator)
  @nestAccessControl.UseRoles({
    resource: "Authenticator",
    action: "delete",
    possession: "any",
  })
  async deleteAuthenticator(
    @graphql.Args() args: DeleteAuthenticatorArgs
  ): Promise<Authenticator | null> {
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
