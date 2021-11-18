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
import { CreateFieldArgs } from "./CreateFieldArgs";
import { UpdateFieldArgs } from "./UpdateFieldArgs";
import { DeleteFieldArgs } from "./DeleteFieldArgs";
import { FieldFindManyArgs } from "./FieldFindManyArgs";
import { FieldFindUniqueArgs } from "./FieldFindUniqueArgs";
import { Field } from "./Field";
import { Entity } from "../../entity/base/Entity";
import { FieldService } from "../field.service";

@graphql.Resolver(() => Field)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class FieldResolverBase {
  constructor(
    protected readonly service: FieldService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Field",
    action: "read",
    possession: "any",
  })
  async _fieldsMeta(
    @graphql.Args() args: FieldFindManyArgs
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

  @graphql.Query(() => [Field])
  @nestAccessControl.UseRoles({
    resource: "Field",
    action: "read",
    possession: "any",
  })
  async fields(
    @graphql.Args() args: FieldFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Field[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Field",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Field, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Field",
    action: "read",
    possession: "own",
  })
  async field(
    @graphql.Args() args: FieldFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Field | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Field",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Field)
  @nestAccessControl.UseRoles({
    resource: "Field",
    action: "create",
    possession: "any",
  })
  async createField(
    @graphql.Args() args: CreateFieldArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Field> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Field",
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
        `providing the properties: ${properties} on ${"Field"} creation is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Field)
  @nestAccessControl.UseRoles({
    resource: "Field",
    action: "update",
    possession: "any",
  })
  async updateField(
    @graphql.Args() args: UpdateFieldArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Field | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Field",
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
        `providing the properties: ${properties} on ${"Field"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Field)
  @nestAccessControl.UseRoles({
    resource: "Field",
    action: "delete",
    possession: "any",
  })
  async deleteField(
    @graphql.Args() args: DeleteFieldArgs
  ): Promise<Field | null> {
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
    resource: "Field",
    action: "read",
    possession: "any",
  })
  async entity(
    @graphql.Parent() parent: Field,
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
