import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { HookService } from "../hook.service";
import { HookCreateInput } from "./HookCreateInput";
import { HookWhereInput } from "./HookWhereInput";
import { HookWhereUniqueInput } from "./HookWhereUniqueInput";
import { HookFindManyArgs } from "./HookFindManyArgs";
import { HookUpdateInput } from "./HookUpdateInput";
import { Hook } from "./Hook";
@swagger.ApiBearerAuth()
export class HookControllerBase {
  constructor(
    protected readonly service: HookService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Hook })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: HookCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Hook> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Hook",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Hook"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        entity: data.entity
          ? {
              connect: data.entity,
            }
          : undefined,

        entityLogic: data.entityLogic
          ? {
              connect: data.entityLogic,
            }
          : undefined,

        function: data.function
          ? {
              connect: data.function,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        description: true,
        displayName: true,

        entity: {
          select: {
            id: true,
          },
        },

        entityLogic: {
          select: {
            id: true,
          },
        },

        event: true,

        function: {
          select: {
            id: true,
          },
        },

        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Hook] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => HookFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Hook[]> {
    const args = plainToClass(HookFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Hook",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        description: true,
        displayName: true,

        entity: {
          select: {
            id: true,
          },
        },

        entityLogic: {
          select: {
            id: true,
          },
        },

        event: true,

        function: {
          select: {
            id: true,
          },
        },

        id: true,
        name: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Hook })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: HookWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Hook | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Hook",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        description: true,
        displayName: true,

        entity: {
          select: {
            id: true,
          },
        },

        entityLogic: {
          select: {
            id: true,
          },
        },

        event: true,

        function: {
          select: {
            id: true,
          },
        },

        id: true,
        name: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Hook })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: HookWhereUniqueInput,
    @common.Body()
    data: HookUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Hook | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Hook",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Hook"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          entity: data.entity
            ? {
                connect: data.entity,
              }
            : undefined,

          entityLogic: data.entityLogic
            ? {
                connect: data.entityLogic,
              }
            : undefined,

          function: data.function
            ? {
                connect: data.function,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          description: true,
          displayName: true,

          entity: {
            select: {
              id: true,
            },
          },

          entityLogic: {
            select: {
              id: true,
            },
          },

          event: true,

          function: {
            select: {
              id: true,
            },
          },

          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Hook",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Hook })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: HookWhereUniqueInput
  ): Promise<Hook | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          description: true,
          displayName: true,

          entity: {
            select: {
              id: true,
            },
          },

          entityLogic: {
            select: {
              id: true,
            },
          },

          event: true,

          function: {
            select: {
              id: true,
            },
          },

          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
